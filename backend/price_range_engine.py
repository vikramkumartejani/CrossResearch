"""
Multi-Asset Six-Level Range Engine
Extracted from notebook for API usage
"""

import json
import logging
import math
import subprocess
import sys
import time
import warnings
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from statistics import NormalDist
from typing import Any

import numpy as np
import pandas as pd


# =============================================================================
# USER SETTINGS
# =============================================================================

SOURCE = "live"                  # "live" or "synthetic"
HISTORY_DAYS = 59                # yfinance intraday history window
INTERVAL = "1h"
DOWNLOAD_RETRIES = 3

# Annualized ATM implied volatility in percent. Leave None to use RV21.
IV_OVERRIDES: dict[str, float | None] = {
    "EURUSD": None,
    "GBPUSD": None,
    "USDJPY": None,
    "XAUUSD": None,
    "XAGUSD": None,
    "USOIL": None,
    "NAS100": None,
    "US30": None,
    "SP500": None,
    "BTCUSD": None,
}

# 25-delta risk reversal in volatility points.
RR25_OVERRIDES: dict[str, float] = {
    asset: 0.0 for asset in IV_OVERRIDES
}


# =============================================================================
# QUIET OUTPUT
# =============================================================================

warnings.filterwarnings("ignore")
logging.basicConfig(level=logging.ERROR, format="%(levelname)s: %(message)s")
log = logging.getLogger("six_level_engine")


# =============================================================================
# ASSET REGISTRY
# =============================================================================

@dataclass(frozen=True)
class AssetSpec:
    name: str
    tickers: tuple[str, ...]
    tick_size: float
    precision: int
    asset_class: str
    synthetic_base: float
    synthetic_daily_vol: float
    annualization_days: int
    daily_timezone: str
    daily_close_hour: int


ASSETS: tuple[AssetSpec, ...] = (
    AssetSpec(
        "EURUSD", ("EURUSD=X",), 0.00010, 5, "fx",
        1.0850, 0.006, 252, "America/New_York", 17,
    ),
    AssetSpec(
        "GBPUSD", ("GBPUSD=X",), 0.00010, 5, "fx",
        1.2700, 0.007, 252, "America/New_York", 17,
    ),
    AssetSpec(
        "USDJPY", ("JPY=X", "USDJPY=X"), 0.010, 3, "fx",
        155.00, 0.007, 252, "America/New_York", 17,
    ),
    AssetSpec(
        "XAUUSD", ("GC=F",), 0.10, 2, "metal",
        2400.0, 0.012, 252, "America/New_York", 17,
    ),
    AssetSpec(
        "XAGUSD", ("SI=F",), 0.010, 3, "metal",
        29.00, 0.020, 252, "America/New_York", 17,
    ),
    AssetSpec(
        "USOIL", ("CL=F",), 0.01, 2, "energy",
        78.00, 0.022, 252, "America/New_York", 17,
    ),
    AssetSpec(
        "NAS100", ("NQ=F", "^NDX"), 0.25, 2, "index",
        19500.0, 0.013, 252, "America/New_York", 17,
    ),
    AssetSpec(
        "US30", ("YM=F", "^DJI"), 1.0, 1, "index",
        39000.0, 0.009, 252, "America/New_York", 17,
    ),
    AssetSpec(
        "SP500", ("ES=F", "^GSPC"), 0.25, 2, "index",
        5500.0, 0.010, 252, "America/New_York", 17,
    ),
    AssetSpec(
        "BTCUSD", ("BTC-USD",), 1.0, 1, "crypto",
        65000.0, 0.030, 365, "UTC", 0,
    ),
)

ASSET_MAP = {asset.name: asset for asset in ASSETS}


# =============================================================================
# MODEL CONFIGURATION
# =============================================================================

@dataclass(frozen=True)
class ModelConfig:
    # Daily volatility
    atr_period: int = 14
    rv_window: int = 21
    confidence: float = 0.95

    # 4H structure
    swing_lookback_days: int = 45
    fractal_k: int = 2
    cluster_bandwidth_atr: float = 0.30
    min_touches_strong: int = 3
    minimum_strong_score: float = 1.25
    recency_half_life_days: float = 15.0

    # Intraday blend
    pivot_weight: float = 0.50

    # Realized sigma construction
    close_to_close_weight: float = 0.50
    atr_sigma_weight: float = 0.50
    atr_to_sigma_divisor: float = math.sqrt(8.0 / math.pi)

    # IV/RV blend
    iv_weight_normal: float = 0.60
    iv_weight_high_premium: float = 0.40
    iv_weight_low_premium: float = 0.70
    premium_high: float = 1.20
    premium_low: float = 0.80
    skew_tilt: float = 0.10

    # Range hierarchy
    trend_fallback_atr: float = 1.00
    envelope_buffer_atr: float = 0.25

    # FX session bias only
    sessions: dict[str, tuple[str, str]] = field(
        default_factory=lambda: {
            "TOKYO": ("00:00", "06:00"),
            "LONDON": ("07:00", "12:00"),
            "NY": ("12:00", "17:00"),
        }
    )
    session_bias: dict[str, float] = field(
        default_factory=lambda: {
            "TOKYO": 1.00,
            "LONDON": 1.15,
            "NY": 0.90,
        }
    )


# =============================================================================
# DEPENDENCY MANAGEMENT
# =============================================================================

def install_yfinance_if_needed() -> None:
    try:
        import yfinance  # noqa: F401
    except ImportError:
        print("Installing yfinance...")
        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", "-q", "yfinance"]
        )


# =============================================================================
# DATA LAYER
# =============================================================================

def _flatten_yfinance_columns(df: pd.DataFrame, ticker: str) -> pd.DataFrame:
    if not isinstance(df.columns, pd.MultiIndex):
        return df

    for level in range(df.columns.nlevels):
        values = df.columns.get_level_values(level)
        if ticker in values:
            try:
                return df.xs(ticker, axis=1, level=level, drop_level=True)
            except Exception:
                pass

    required = {"Open", "High", "Low", "Close"}
    first = df.columns.get_level_values(0)
    last = df.columns.get_level_values(-1)

    out = df.copy()
    if required.issubset(set(first)):
        out.columns = first
    elif required.issubset(set(last)):
        out.columns = last
    return out


def clean_ohlc(df: pd.DataFrame) -> pd.DataFrame:
    if df is None or df.empty:
        raise ValueError("No market data returned.")

    out = df.copy()
    out.columns = [str(column).strip().title() for column in out.columns]
    required = ["Open", "High", "Low", "Close"]
    missing = [column for column in required if column not in out.columns]
    if missing:
        raise ValueError(f"Missing required OHLC columns: {missing}")

    out = out[required]
    for column in required:
        out[column] = pd.to_numeric(out[column], errors="coerce")

    out.index = pd.to_datetime(out.index, utc=True, errors="coerce")
    out = out[~out.index.isna()]
    out = out.replace([np.inf, -np.inf], np.nan).dropna()
    out = out[~out.index.duplicated(keep="last")].sort_index()

    valid = (
        (out["High"] >= out[["Open", "Close", "Low"]].max(axis=1))
        & (out["Low"] <= out[["Open", "Close", "High"]].min(axis=1))
        & (out["Low"] > 0)
    )
    out = out[valid]

    if len(out) < 120:
        raise ValueError(f"Only {len(out)} valid hourly observations returned.")
    return out


def download_ticker(ticker: str, history_days: int) -> pd.DataFrame:
    import yfinance as yf

    end = pd.Timestamp.now(tz="UTC").ceil("D") + pd.Timedelta(days=1)
    start = end - pd.Timedelta(days=history_days)

    base_kwargs: dict[str, Any] = {
        "tickers": ticker,
        "start": start.strftime("%Y-%m-%d"),
        "end": end.strftime("%Y-%m-%d"),
        "interval": INTERVAL,
        "auto_adjust": False,
        "actions": False,
        "progress": False,
        "threads": False,
        "prepost": False,
        "repair": True,
        "timeout": 30,
    }

    try:
        df = yf.download(**base_kwargs, multi_level_index=False)
    except TypeError:
        base_kwargs.pop("repair", None)
        df = yf.download(**base_kwargs)

    df = _flatten_yfinance_columns(df, ticker)
    return clean_ohlc(df)


def download_asset(
    spec: AssetSpec,
    history_days: int,
    retries: int,
) -> tuple[pd.DataFrame, str]:
    errors: list[str] = []

    for ticker in spec.tickers:
        for attempt in range(1, retries + 1):
            try:
                return download_ticker(ticker, history_days), ticker
            except Exception as exc:
                errors.append(f"{ticker} attempt {attempt}: {exc}")
                if attempt < retries:
                    time.sleep(1.25 * attempt)

    raise RuntimeError(" | ".join(errors[-4:]))


def make_synthetic(
    spec: AssetSpec,
    days: int = 59,
    seed: int | None = None,
) -> pd.DataFrame:
    if seed is None:
        seed = int.from_bytes(spec.name.encode("utf-8"), "little") % (2**32)

    rng = np.random.default_rng(seed)
    index = pd.date_range(
        end=pd.Timestamp.now(tz="UTC").floor("h"),
        periods=days * 24,
        freq="1h",
    )

    active = np.isin(index.hour.to_numpy(), np.arange(7, 18))
    seasonality = np.where(active, 1.60, 1.00)
    hourly_sigma = spec.synthetic_daily_vol / math.sqrt(24) * seasonality
    returns = rng.normal(0.0, hourly_sigma)
    close = spec.synthetic_base * np.exp(np.cumsum(returns))
    previous = np.concatenate(([close[0]], close[:-1]))
    spread = np.abs(rng.normal(0.0, hourly_sigma * 0.80)) * close

    df = pd.DataFrame(
        {
            "Open": previous,
            "High": np.maximum(close, previous) + spread,
            "Low": np.minimum(close, previous) - spread,
            "Close": close,
        },
        index=index,
    )
    return clean_ohlc(df)


def resample_ohlc(df: pd.DataFrame, rule: str) -> pd.DataFrame:
    return (
        df.resample(rule)
        .agg({"Open": "first", "High": "max", "Low": "min", "Close": "last"})
        .dropna()
    )


def completed_session_bars(df: pd.DataFrame, spec: AssetSpec) -> pd.DataFrame:
    localized = df.tz_convert(spec.daily_timezone)
    offset = f"{spec.daily_close_hour}h"

    daily = (
        localized.resample("1D", offset=offset, closed="right", label="right")
        .agg({"Open": "first", "High": "max", "Low": "min", "Close": "last"})
        .dropna()
    )
    daily.index = daily.index.tz_convert("UTC")

    now = pd.Timestamp.now(tz="UTC")
    return daily[daily.index <= now]


# =============================================================================
# VOLATILITY MODEL
# =============================================================================

def wilder_atr(daily: pd.DataFrame, period: int) -> float:
    high = daily["High"]
    low = daily["Low"]
    close = daily["Close"]
    previous_close = close.shift(1)

    true_range = pd.concat(
        [
            high - low,
            (high - previous_close).abs(),
            (low - previous_close).abs(),
        ],
        axis=1,
    ).max(axis=1)

    atr = true_range.ewm(
        alpha=1.0 / period,
        adjust=False,
        min_periods=period,
    ).mean()
    value = float(atr.iloc[-1])

    if not np.isfinite(value) or value <= 0:
        raise ValueError("ATR could not be computed.")
    return value


def realized_vol_annualized(
    daily: pd.DataFrame,
    window: int,
    annualization_days: int,
) -> float:
    returns = np.log(daily["Close"]).diff().dropna().tail(window)
    if len(returns) < max(10, window // 2):
        raise ValueError("Insufficient observations for realized volatility.")

    value = float(returns.std(ddof=1) * math.sqrt(annualization_days) * 100.0)
    if not np.isfinite(value) or value <= 0:
        raise ValueError("Realized volatility could not be computed.")
    return value


def build_volatility_model(
    spot: float,
    atr: float,
    rv_pct: float,
    iv_pct: float,
    rr25: float,
    spec: AssetSpec,
    cfg: ModelConfig,
) -> dict[str, float]:
    annualizer = math.sqrt(spec.annualization_days)

    iv_sigma = spot * (iv_pct / 100.0) / annualizer
    close_to_close_sigma = spot * (rv_pct / 100.0) / annualizer
    atr_sigma = atr / cfg.atr_to_sigma_divisor

    realized_sigma = (
        cfg.close_to_close_weight * close_to_close_sigma
        + cfg.atr_sigma_weight * atr_sigma
    )
    realized_sigma = max(realized_sigma, spec.tick_size)

    premium = iv_sigma / realized_sigma
    if premium > cfg.premium_high:
        iv_weight = cfg.iv_weight_high_premium
    elif premium < cfg.premium_low:
        iv_weight = cfg.iv_weight_low_premium
    else:
        iv_weight = cfg.iv_weight_normal

    expected_sigma = (
        iv_weight * iv_sigma
        + (1.0 - iv_weight) * realized_sigma
    )
    expected_sigma = max(expected_sigma, spec.tick_size)

    z_score = NormalDist().inv_cdf((1.0 + cfg.confidence) / 2.0)
    raw_high = spot + z_score * expected_sigma
    raw_low = spot - z_score * expected_sigma

    tilt = cfg.skew_tilt * rr25 * expected_sigma
    if tilt < 0:
        raw_low += tilt
    elif tilt > 0:
        raw_high += tilt

    return {
        "raw_high": raw_high,
        "raw_low": raw_low,
        "expected_sigma": expected_sigma,
        "iv_sigma": iv_sigma,
        "realized_sigma": realized_sigma,
        "close_to_close_sigma": close_to_close_sigma,
        "atr_sigma": atr_sigma,
        "vol_premium": premium,
        "iv_weight": iv_weight,
        "skew_tilt": tilt,
    }


# =============================================================================
# INTRADAY RANGE
# =============================================================================

def current_session(now_utc: datetime, cfg: ModelConfig) -> str:
    current_time = now_utc.strftime("%H:%M")
    for session_name, (start, end) in cfg.sessions.items():
        if start <= current_time < end:
            return session_name
    return "TOKYO"


def build_pivot_model(
    previous_session: pd.Series,
    expected_sigma: float,
    spec: AssetSpec,
    cfg: ModelConfig,
) -> dict[str, float]:
    previous_high = float(previous_session["High"])
    previous_low = float(previous_session["Low"])
    previous_close = float(previous_session["Close"])

    pivot = (previous_high + previous_low + previous_close) / 3.0
    raw_r1 = 2.0 * pivot - previous_low
    raw_s1 = 2.0 * pivot - previous_high

    session = current_session(datetime.now(timezone.utc), cfg)
    bias = cfg.session_bias.get(session, 1.0) if spec.asset_class == "fx" else 1.0

    r1 = pivot + (raw_r1 - pivot) * bias
    s1 = pivot - (pivot - raw_s1) * bias

    return {
        "PP": pivot,
        "R1": r1,
        "S1": s1,
        "VOL_R1": pivot + expected_sigma,
        "VOL_S1": pivot - expected_sigma,
        "session_bias": bias,
    }


def calculate_intraday_range(
    spot: float,
    pivot_model: dict[str, float],
    spec: AssetSpec,
    cfg: ModelConfig,
) -> tuple[float, float]:
    pivot = pivot_model["PP"]

    pivot_up = max(pivot_model["R1"] - pivot, spec.tick_size)
    pivot_down = max(pivot - pivot_model["S1"], spec.tick_size)
    vol_up = max(pivot_model["VOL_R1"] - pivot, spec.tick_size)
    vol_down = max(pivot - pivot_model["VOL_S1"], spec.tick_size)

    weight = cfg.pivot_weight
    upper_distance = weight * pivot_up + (1.0 - weight) * vol_up
    lower_distance = weight * pivot_down + (1.0 - weight) * vol_down

    return spot + upper_distance, spot - lower_distance


# =============================================================================
# TREND RANGE
# =============================================================================

def find_confirmed_swings(
    df4h: pd.DataFrame,
    k: int,
) -> tuple[pd.Series, pd.Series]:
    window = 2 * k + 1
    high = df4h["High"]
    low = df4h["Low"]

    swing_highs = high[
        high.eq(high.rolling(window, center=True).max()).fillna(False)
    ]
    swing_lows = low[
        low.eq(low.rolling(window, center=True).min()).fillna(False)
    ]
    return swing_highs, swing_lows


def cluster_structural_prices(
    points: pd.Series,
    bandwidth: float,
    now: pd.Timestamp,
    half_life_days: float,
) -> list[dict[str, float | int]]:
    if points.empty:
        return []

    ages_days = (
        np.asarray((now - points.index).total_seconds(), dtype=float) / 86400.0
    )
    weights = np.exp(-np.log(2.0) * ages_days / half_life_days)

    prices = points.to_numpy(dtype=float)
    order = np.argsort(prices)
    prices = prices[order]
    weights = weights[order]

    clusters: list[tuple[list[float], list[float]]] = []
    current_prices = [float(prices[0])]
    current_weights = [float(weights[0])]

    for price, weight in zip(prices[1:], weights[1:]):
        price = float(price)
        weight = float(weight)
        center = float(
            sum(p * w for p, w in zip(current_prices, current_weights)) / sum(current_weights)
        )

        if abs(price - center) <= bandwidth:
            current_prices.append(price)
            current_weights.append(weight)
        else:
            clusters.append((current_prices, current_weights))
            current_prices = [price]
            current_weights = [weight]

    clusters.append((current_prices, current_weights))

    output: list[dict[str, float | int]] = []
    for prices_group, weights_group in clusters:
        price_array = np.asarray(prices_group, dtype=float)
        weight_array = np.asarray(weights_group, dtype=float)
        output.append(
            {
                "price": float(sum(p * w for p, w in zip(price_array, weight_array)) / sum(weight_array)),
                "touches": int(len(prices_group)),
                "score": float(weight_array.sum()),
            }
        )
    return output


def build_structure(
    df4h: pd.DataFrame,
    spot: float,
    atr: float,
    cfg: ModelConfig,
) -> dict[str, list[dict[str, Any]]]:
    swing_highs, swing_lows = find_confirmed_swings(df4h, cfg.fractal_k)
    bandwidth = max(atr * cfg.cluster_bandwidth_atr, spot * 1e-8)
    now = df4h.index[-1]

    resistance_clusters = cluster_structural_prices(
        swing_highs, bandwidth, now, cfg.recency_half_life_days
    )
    support_clusters = cluster_structural_prices(
        swing_lows, bandwidth, now, cfg.recency_half_life_days
    )

    resistances: list[dict[str, Any]] = []
    for cluster in resistance_clusters:
        if float(cluster["price"]) > spot:
            cluster["strong"] = (
                int(cluster["touches"]) >= cfg.min_touches_strong
                and float(cluster["score"]) >= cfg.minimum_strong_score
            )
            resistances.append(cluster)

    supports: list[dict[str, Any]] = []
    for cluster in support_clusters:
        if float(cluster["price"]) < spot:
            cluster["strong"] = (
                int(cluster["touches"]) >= cfg.min_touches_strong
                and float(cluster["score"]) >= cfg.minimum_strong_score
            )
            supports.append(cluster)

    resistances.sort(key=lambda level: float(level["price"]))
    supports.sort(key=lambda level: -float(level["price"]))
    return {"resistances": resistances, "supports": supports}


def _select_trend_level(
    candidates: list[dict[str, Any]],
    side: str,
    intraday_edge: float,
    statistical_edge: float,
) -> float | None:
    if side == "resistance":
        outside = [level for level in candidates if float(level["price"]) > intraday_edge]
        inside_statistical = [
            level for level in outside if float(level["price"]) < statistical_edge
        ]
        selector = min
    elif side == "support":
        outside = [level for level in candidates if float(level["price"]) < intraday_edge]
        inside_statistical = [
            level for level in outside if float(level["price"]) > statistical_edge
        ]
        selector = max
    else:
        raise ValueError("side must be 'resistance' or 'support'.")

    priority_pools = (
        [level for level in inside_statistical if bool(level["strong"])],
        inside_statistical,
        [level for level in outside if bool(level["strong"])],
        outside,
    )

    for pool in priority_pools:
        if pool:
            return float(selector(float(level["price"]) for level in pool))
    return None


def calculate_trend_range(
    structure: dict[str, list[dict[str, Any]]],
    intraday_high: float,
    intraday_low: float,
    raw_volatility_high: float,
    raw_volatility_low: float,
    atr: float,
    cfg: ModelConfig,
) -> tuple[float, float]:
    trend_high = _select_trend_level(
        structure["resistances"],
        "resistance",
        intraday_high,
        raw_volatility_high,
    )
    trend_low = _select_trend_level(
        structure["supports"],
        "support",
        intraday_low,
        raw_volatility_low,
    )

    if trend_high is None:
        trend_high = intraday_high + cfg.trend_fallback_atr * atr
    if trend_low is None:
        trend_low = intraday_low - cfg.trend_fallback_atr * atr

    trend_high = max(trend_high, intraday_high + 1e-12)
    trend_low = min(trend_low, intraday_low - 1e-12)
    return trend_high, trend_low


# =============================================================================
# FINAL RANGE ASSEMBLY
# =============================================================================

def calculate_final_volatility_range(
    raw_high: float,
    raw_low: float,
    trend_high: float,
    trend_low: float,
    atr: float,
    cfg: ModelConfig,
) -> tuple[float, float]:
    buffer = max(cfg.envelope_buffer_atr * atr, 1e-12)
    high = raw_high if raw_high > trend_high else trend_high + buffer
    low = raw_low if raw_low < trend_low else trend_low - buffer
    return high, low


def validate_hierarchy(
    spec: AssetSpec,
    spot: float,
    intraday_high: float,
    intraday_low: float,
    trend_high: float,
    trend_low: float,
    volatility_high: float,
    volatility_low: float,
) -> None:
    values = (
        spot,
        intraday_high,
        intraday_low,
        trend_high,
        trend_low,
        volatility_high,
        volatility_low,
    )
    if not all(np.isfinite(value) for value in values):
        raise ValueError(f"{spec.name}: non-finite output detected.")

    valid = (
        intraday_high > spot > intraday_low
        and trend_high > intraday_high
        and trend_low < intraday_low
        and volatility_high > trend_high
        and volatility_low < trend_low
    )
    if not valid:
        raise ValueError(f"{spec.name}: range hierarchy validation failed.")


def calculate_asset_ranges(
    spec: AssetSpec,
    hourly: pd.DataFrame,
    source_ticker: str,
    cfg: ModelConfig,
    iv_override: float | None,
    rr25: float,
) -> tuple[dict[str, dict[str, float]], dict[str, Any]]:
    daily = completed_session_bars(hourly, spec)
    minimum_daily_bars = max(cfg.atr_period + 2, cfg.rv_window + 2)
    if len(daily) < minimum_daily_bars:
        raise ValueError(
            f"{spec.name}: only {len(daily)} completed session bars; "
            f"{minimum_daily_bars} required."
        )

    df4h = resample_ohlc(hourly, "4h").tail(cfg.swing_lookback_days * 6)
    if len(df4h) < 40:
        raise ValueError(f"{spec.name}: insufficient 4H history.")

    spot = float(hourly["Close"].iloc[-1])
    atr = wilder_atr(daily, cfg.atr_period)
    rv_pct = realized_vol_annualized(
        daily, cfg.rv_window, spec.annualization_days
    )

    iv_pct = rv_pct if iv_override is None else float(iv_override)
    if not np.isfinite(iv_pct) or iv_pct <= 0:
        raise ValueError(f"{spec.name}: IV must be positive or None.")

    volatility_model = build_volatility_model(
        spot=spot,
        atr=atr,
        rv_pct=rv_pct,
        iv_pct=iv_pct,
        rr25=rr25,
        spec=spec,
        cfg=cfg,
    )

    previous_session = daily.iloc[-1]
    pivot_model = build_pivot_model(
        previous_session=previous_session,
        expected_sigma=volatility_model["expected_sigma"],
        spec=spec,
        cfg=cfg,
    )

    intraday_high, intraday_low = calculate_intraday_range(
        spot, pivot_model, spec, cfg
    )

    structure = build_structure(df4h, spot, atr, cfg)
    trend_high, trend_low = calculate_trend_range(
        structure=structure,
        intraday_high=intraday_high,
        intraday_low=intraday_low,
        raw_volatility_high=volatility_model["raw_high"],
        raw_volatility_low=volatility_model["raw_low"],
        atr=atr,
        cfg=cfg,
    )

    volatility_high, volatility_low = calculate_final_volatility_range(
        raw_high=volatility_model["raw_high"],
        raw_low=volatility_model["raw_low"],
        trend_high=trend_high,
        trend_low=trend_low,
        atr=atr,
        cfg=cfg,
    )

    validate_hierarchy(
        spec,
        spot,
        intraday_high,
        intraday_low,
        trend_high,
        trend_low,
        volatility_high,
        volatility_low,
    )

    ranges = {
        "intraday_range": {
            "high": round(intraday_high, spec.precision),
            "low": round(intraday_low, spec.precision),
        },
        "trend_range": {
            "high": round(trend_high, spec.precision),
            "low": round(trend_low, spec.precision),
        },
        "volatility_range": {
            "high": round(volatility_high, spec.precision),
            "low": round(volatility_low, spec.precision),
        },
    }

    metadata: dict[str, Any] = {
        "source_ticker": source_ticker,
        "latest_bar_utc": hourly.index[-1].isoformat(),
        "last_completed_session_utc": daily.index[-1].isoformat(),
        "spot": spot,
        "atr14": atr,
        "rv21_pct": rv_pct,
        "iv_used_pct": iv_pct,
        "iv_source": "realized_vol_fallback" if iv_override is None else "override",
        "rr25": rr25,
        "expected_sigma": volatility_model["expected_sigma"],
        "raw_statistical_high": volatility_model["raw_high"],
        "raw_statistical_low": volatility_model["raw_low"],
        "vol_premium": volatility_model["vol_premium"],
        "iv_weight": volatility_model["iv_weight"],
        "session_bias": pivot_model["session_bias"],
    }
    return ranges, metadata


# =============================================================================
# ORCHESTRATION
# =============================================================================

def run_all(
    assets: list[str] | None = None,
    source: str = SOURCE,
    iv_overrides: dict[str, float | None] | None = None,
    rr25_overrides: dict[str, float] | None = None,
    cfg: ModelConfig | None = None,
) -> tuple[
    dict[str, dict[str, dict[str, float]]],
    dict[str, str],
]:
    if source not in {"live", "synthetic"}:
        raise ValueError("source must be 'live' or 'synthetic'.")

    if source == "live":
        install_yfinance_if_needed()

    cfg = cfg or ModelConfig()
    iv_overrides = IV_OVERRIDES if iv_overrides is None else iv_overrides
    rr25_overrides = RR25_OVERRIDES if rr25_overrides is None else rr25_overrides
    requested_assets = assets or [spec.name for spec in ASSETS]

    results: dict[str, dict[str, dict[str, float]]] = {}
    metadata: dict[str, dict[str, Any]] = {}
    failures: dict[str, str] = {}

    for asset_name in requested_assets:
        spec = ASSET_MAP.get(asset_name)
        if spec is None:
            failures[asset_name] = "Unknown asset."
            continue

        try:
            if source == "live":
                hourly, source_ticker = download_asset(
                    spec, HISTORY_DAYS, DOWNLOAD_RETRIES
                )
            else:
                hourly = make_synthetic(spec, days=HISTORY_DAYS)
                source_ticker = "synthetic"

            ranges, asset_metadata = calculate_asset_ranges(
                spec=spec,
                hourly=hourly,
                source_ticker=source_ticker,
                cfg=cfg,
                iv_override=iv_overrides.get(asset_name),
                rr25=float(rr25_overrides.get(asset_name, 0.0)),
            )
            results[asset_name] = ranges
            metadata[asset_name] = asset_metadata

        except Exception as exc:
            failures[asset_name] = str(exc)

    payload = {
        "generated_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "assets": results,
        "metadata": metadata,
        "failures": failures,
    }
    
    return payload, failures


if __name__ == "__main__":
    # For testing
    payload, failures = run_all()
    print(json.dumps(payload, indent=2, default=str))
