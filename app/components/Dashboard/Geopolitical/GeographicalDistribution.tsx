'use client'

import { useEffect, useMemo, useState, type CSSProperties, type MouseEvent } from 'react'
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps'
import FlashpointBrief, { type FlashpointItem } from './FlashpointBrief'
import CommodityRiskMap from './CommodityRiskMap'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

type LayerId =
    | 'country_risk'
    | 'event_density'
    | 'events'
    | 'chokepoints'
    | 'chokepoint_labels'
    | 'trade'
    | 'sanctions'
    | 'ais'

interface LayerDef {
    id: LayerId | string
    label: string
    default: boolean
    enabled: boolean
}

interface CountryDisplay {
    d1h: string
    d24h: string
    d7d: string
    structural: string
    tactical: string
    transmission: string
    gdp: string
    growth: string
    cpi: string
    debt: string
    current_account: string
    reserves: string
    unemployment: string
    trade: string
    military: string
    catalyst: string
    mkt_asset: string
    mkt_dir: string
    mkt_sens: string
    mkt_conf: string
}

interface CountryRisk {
    iso3: string
    iso_numeric: string | null
    country: string
    risk_score: number | null
    risk_tier: string
    confidence?: number | null
    coverage?: number | null
    structural?: number | null
    tactical?: number | null
    transmission?: number | null
    d1h?: number | null
    d24h?: number | null
    d7d?: number | null
    event_count?: number
    top_category?: string | null
    display?: CountryDisplay
}

interface HoverState {
    country: CountryRisk
    x: number
    y: number
    containerW: number
    containerH: number
}

interface Chokepoint {
    name: string
    lat: number | null
    lon: number | null
    risk_score: number | null
    risk_tier: string
    corridor: [number, number][]
}

interface MapEvent {
    lat: number
    lon: number
    score: number | null
    title: string
}

interface TradeLane {
    name: string
    coordinates: [number, number][]
}

interface Sanction {
    iso3: string
    iso_numeric: string | null
    label: string
}

interface LegendTier {
    id: string
    min: number
    color: string
}

interface GeoMapPayload {
    presets: Record<string, string[]>
    layers: LayerDef[]
    default_preset: string
    countries: CountryRisk[]
    chokepoints: Chokepoint[]
    events: MapEvent[]
    trade_lanes: TradeLane[]
    sanctions: Sanction[]
    ais: { lat: number; lon: number; name?: string | null }[]
    legend: { title: string; tiers: LegendTier[] }
    metadata?: Record<string, unknown>
}

const FALLBACK_TIERS: LegendTier[] = [
    { id: 'Critical', min: 75, color: '#E8434F' },
    { id: 'High', min: 55, color: '#F0803C' },
    { id: 'Elevated', min: 35, color: '#E0B54A' },
    { id: 'Low', min: 0, color: '#5B6473' },
]

const BASE_FILL = '#2C323C'
const BASE_HOVER = '#3A4250'

function normalizeIsoId(id: unknown): string {
    const raw = String(id ?? '').trim()
    if (!raw) return ''
    const asNum = Number(raw)
    if (Number.isFinite(asNum)) return String(asNum)
    return raw
}

function colorForScore(score: number | null | undefined, tiers: LegendTier[]): string {
    if (score == null || !Number.isFinite(score)) return BASE_FILL
    const ordered = [...tiers].sort((a, b) => b.min - a.min)
    for (const tier of ordered) {
        if (score >= tier.min) return tier.color
    }
    return BASE_FILL
}

const FALLBACK_LAYERS: LayerDef[] = [
    { id: 'country_risk', label: 'Sovereign risk', default: true, enabled: true },
    { id: 'event_density', label: 'Event density', default: false, enabled: false },
    { id: 'events', label: 'Individual events', default: false, enabled: false },
    { id: 'chokepoints', label: 'Chokepoints', default: true, enabled: true },
    { id: 'chokepoint_labels', label: 'Chokepoint labels', default: false, enabled: true },
    { id: 'trade', label: 'Trade lanes', default: false, enabled: true },
    { id: 'sanctions', label: 'Sanctions', default: false, enabled: true },
    { id: 'ais', label: 'AIS vessels', default: false, enabled: false },
]

export default function GeographicalDistribution() {
    const [mapPayload, setMapPayload] = useState<GeoMapPayload | null>(null)
    const [flashpoints, setFlashpoints] = useState<FlashpointItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [hover, setHover] = useState<HoverState | null>(null)
    const [activeLayers, setActiveLayers] = useState<Set<string>>(
        new Set(FALLBACK_LAYERS.filter((l) => l.default).map((l) => l.id))
    )

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setError(null)

                const [mapRes, newsRes] = await Promise.all([
                    fetch('/api/geopolitical-map'),
                    fetch('/api/geopolitical-news'),
                ])

                if (!mapRes.ok) {
                    const body = await mapRes.json().catch(() => ({}))
                    throw new Error(body.details || body.detail || body.error || 'Failed to load geopolitical map')
                }

                const mapData: GeoMapPayload = await mapRes.json()
                if (cancelled) return

                setMapPayload(mapData)
                const defaults = (mapData.layers?.length ? mapData.layers : FALLBACK_LAYERS)
                    .filter((l) => l.default && l.enabled)
                    .map((l) => l.id)
                setActiveLayers(new Set(defaults.length ? defaults : ['country_risk', 'chokepoints']))

                if (newsRes.ok) {
                    const news = await newsRes.json()
                    const mappedFlashpoints: FlashpointItem[] = (news.flashpoint_brief || []).map((fp: any) => ({
                        region: String(fp.region || 'Global'),
                        date: String(fp.date || '—'),
                        title: String(fp.title || ''),
                        severity: String(fp.severity || 'Medium'),
                        url: fp.url ? String(fp.url) : undefined,
                    }))
                    setFlashpoints(mappedFlashpoints)
                }
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [])

    const tiers = mapPayload?.legend?.tiers?.length ? mapPayload.legend.tiers : FALLBACK_TIERS
    const layerDefs = mapPayload?.layers?.length ? mapPayload.layers : FALLBACK_LAYERS

    const countryByIso = useMemo(() => {
        const map = new Map<string, CountryRisk>()
        for (const c of mapPayload?.countries || []) {
            if (c.iso_numeric) map.set(normalizeIsoId(c.iso_numeric), c)
        }
        return map
    }, [mapPayload])

    const sanctionedIso = useMemo(() => {
        const set = new Set<string>()
        for (const s of mapPayload?.sanctions || []) {
            if (s.iso_numeric) set.add(normalizeIsoId(s.iso_numeric))
        }
        return set
    }, [mapPayload])

    function toggleLayer(id: string, enabled: boolean) {
        if (!enabled) return
        setActiveLayers((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const showCountryRisk = activeLayers.has('country_risk')
    const showEvents = activeLayers.has('events')
    const showChokepoints = activeLayers.has('chokepoints')
    const showLabels = activeLayers.has('chokepoint_labels')
    const showTrade = activeLayers.has('trade')
    const showSanctions = activeLayers.has('sanctions')
    const showAis = activeLayers.has('ais')

    return (
        <div className="px-4 lg:px-6 mb-4 sm:mb-5 space-y-3 sm:space-y-4">
            <div>
                <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">
                    Geographical Distribution
                </h2>

                <div className="bg-[#16161F] border border-[#FFFFFF0D] p-3 sm:p-4">
                    {loading && (
                        <div className="py-20 text-center text-[#838388] text-[13px]">
                            Computing geopolitical risk map…
                        </div>
                    )}
                    {error && !loading && (
                        <div className="py-16 text-center text-[#E25C3F] text-[13px]">{error}</div>
                    )}

                    {!loading && !error && (
                        <div
                            className="relative"
                            onMouseLeave={() => setHover(null)}
                        >
                            {/* Layers sidebar */}
                            <div className="absolute left-3 top-3 z-10 w-[172px] rounded-sm bg-[#16161F] border border-[#2A3140] shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
                                <div className="px-3 pt-2.5 pb-2 border-b border-[#2A3140]">
                                    <p className="text-[#D5DCE8] text-[11px] font-semibold tracking-[0.14em]">
                                        LAYERS
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2.5 px-3 py-2.5">
                                    {layerDefs.map((layer) => {
                                        const checked = activeLayers.has(layer.id)
                                        const disabled = !layer.enabled
                                        return (
                                            <button
                                                key={layer.id}
                                                type="button"
                                                disabled={disabled}
                                                onClick={() => toggleLayer(layer.id, layer.enabled)}
                                                className={`flex items-center gap-2.5 text-left text-[12px] leading-[14px] ${
                                                    disabled
                                                        ? 'text-[#5A6272] cursor-not-allowed'
                                                        : 'text-[#E8EDF5] cursor-pointer'
                                                }`}
                                            >
                                                <span
                                                    className={`w-[13px] h-[13px] flex-shrink-0 rounded-[2px] border flex items-center justify-center ${
                                                        disabled
                                                            ? 'border-[#3A4150] bg-[#1A1F2A] opacity-60'
                                                            : checked
                                                              ? 'border-[#3E8BFF] bg-[#3E8BFF]'
                                                              : 'border-[#C5CDD8] bg-transparent'
                                                    }`}
                                                    aria-hidden
                                                >
                                                    {checked && !disabled && (
                                                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                                                            <path d="M2 5.2L4.1 7.2L8 2.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    )}
                                                </span>
                                                <span>{layer.label}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Risk legend */}
                            <div className="absolute right-3 top-3 z-10 flex flex-col items-center gap-1">
                                <span className="text-white/70 text-[10px] font-medium mb-1">
                                    {mapPayload?.legend?.title || 'Risk'}
                                </span>
                                <div
                                    className="w-[10px] h-[120px] rounded-sm"
                                    style={{
                                        background: `linear-gradient(180deg, ${tiers
                                            .slice()
                                            .reverse()
                                            .map((t) => t.color)
                                            .join(', ')})`,
                                    }}
                                />
                                <div className="flex flex-col gap-3 mt-1">
                                    {tiers.map((t) => (
                                        <span key={t.id} className="text-[10px] text-white/55 leading-none">
                                            {t.id}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {hover && (
                                <CountryHoverCard
                                    country={hover.country}
                                    x={hover.x}
                                    y={hover.y}
                                    containerW={hover.containerW}
                                    containerH={hover.containerH}
                                />
                            )}

                            <ComposableMap
                                projection="geoEqualEarth"
                                projectionConfig={{ scale: 155, center: [10, 8] }}
                                style={{ width: '100%', height: 'auto' }}
                                height={420}
                            >
                                <Geographies geography={GEO_URL}>
                                    {({ geographies }: { geographies: any[] }) =>
                                        geographies.map((geo: any) => {
                                            const iso = normalizeIsoId(geo.id)
                                            const country = countryByIso.get(iso)
                                            const sanctioned = showSanctions && sanctionedIso.has(iso)
                                            let fill = BASE_FILL
                                            if (showCountryRisk && country?.risk_score != null) {
                                                fill = colorForScore(country.risk_score, tiers)
                                            } else if (sanctioned) {
                                                fill = '#9B7BE8'
                                            }

                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    onMouseEnter={(evt: MouseEvent) => {
                                                        if (!country) {
                                                            setHover(null)
                                                            return
                                                        }
                                                        const el = evt.currentTarget.closest('.relative') as HTMLElement | null
                                                        const box = el?.getBoundingClientRect()
                                                        if (!box) return
                                                        setHover({
                                                            country,
                                                            x: evt.clientX - box.left,
                                                            y: evt.clientY - box.top,
                                                            containerW: box.width,
                                                            containerH: box.height,
                                                        })
                                                    }}
                                                    onMouseMove={(evt: MouseEvent) => {
                                                        if (!country) return
                                                        const el = evt.currentTarget.closest('.relative') as HTMLElement | null
                                                        const box = el?.getBoundingClientRect()
                                                        if (!box) return
                                                        setHover({
                                                            country,
                                                            x: evt.clientX - box.left,
                                                            y: evt.clientY - box.top,
                                                            containerW: box.width,
                                                            containerH: box.height,
                                                        })
                                                    }}
                                                    onMouseLeave={() => setHover(null)}
                                                    style={{
                                                        default: {
                                                            fill,
                                                            stroke: '#16161F',
                                                            strokeWidth: 0.4,
                                                            outline: 'none',
                                                            cursor: country ? 'pointer' : 'default',
                                                        },
                                                        hover: {
                                                            fill: country ? fill : BASE_HOVER,
                                                            stroke: '#16161F',
                                                            strokeWidth: 0.4,
                                                            outline: 'none',
                                                            opacity: 0.92,
                                                        },
                                                        pressed: { fill, outline: 'none' },
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                </Geographies>

                                {showTrade &&
                                    (mapPayload?.trade_lanes || []).map((lane, idx) => (
                                        <Line
                                            key={`trade-${idx}`}
                                            coordinates={lane.coordinates}
                                            stroke="#35C4C0"
                                            strokeWidth={0.9}
                                            strokeLinecap="round"
                                            strokeOpacity={0.55}
                                        />
                                    ))}

                                {showChokepoints &&
                                    (mapPayload?.chokepoints || []).map((cp) => {
                                        if (cp.lon == null || cp.lat == null) return null
                                        const color = colorForScore(cp.risk_score, tiers)
                                        return (
                                            <Marker key={cp.name} coordinates={[cp.lon, cp.lat]}>
                                                <circle r={4.5} fill={color} stroke="#E8EDF5" strokeWidth={0.8} />
                                                {showLabels && (
                                                    <text
                                                        textAnchor="middle"
                                                        y={-8}
                                                        style={{
                                                            fontFamily: 'system-ui',
                                                            fill: '#E8EDF5',
                                                            fontSize: 7,
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {cp.name}
                                                    </text>
                                                )}
                                                <title>{`${cp.name} · ${cp.risk_tier} (${cp.risk_score?.toFixed(0) ?? '—'})`}</title>
                                            </Marker>
                                        )
                                    })}

                                {showEvents &&
                                    (mapPayload?.events || []).slice(0, 120).map((ev, idx) => (
                                        <Marker key={`ev-${idx}`} coordinates={[ev.lon, ev.lat]}>
                                            <circle r={2.2} fill="#E8434F" fillOpacity={0.75} />
                                            <title>{ev.title}</title>
                                        </Marker>
                                    ))}

                                {showAis &&
                                    (mapPayload?.ais || []).map((v, idx) => (
                                        <Marker key={`ais-${idx}`} coordinates={[v.lon, v.lat]}>
                                            <circle r={1.8} fill="#3E8BFF" fillOpacity={0.8} />
                                            <title>{v.name || 'Vessel'}</title>
                                        </Marker>
                                    ))}
                            </ComposableMap>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_524px] gap-3 sm:gap-4 items-stretch">
                <CommodityRiskMap />
                <FlashpointBrief items={flashpoints} loading={loading} error={null} />
            </div>
        </div>
    )
}

function CountryHoverCard({
    country,
    x,
    y,
    containerW,
    containerH,
}: {
    country: CountryRisk
    x: number
    y: number
    containerW: number
    containerH: number
}) {
    const d = country.display
    const conf =
        country.confidence != null && Number.isFinite(country.confidence)
            ? `${Math.round(country.confidence)}%`
            : '—'
    const score =
        country.risk_score != null && Number.isFinite(country.risk_score)
            ? country.risk_score.toFixed(1)
            : '—'

    const structural = d?.structural ?? (country.structural != null ? country.structural.toFixed(1) : '—')
    const tactical = d?.tactical ?? (country.tactical != null ? country.tactical.toFixed(1) : '—')
    const market = d?.transmission ?? (country.transmission != null ? country.transmission.toFixed(1) : '—')

    const cardW = 300
    const cardH = 210
    const pad = 12
    const flipX = x + pad + cardW > containerW
    const flipY = y + pad + cardH > containerH
    const style: CSSProperties = {
        left: flipX ? Math.max(pad, x - cardW - pad) : x + pad,
        top: flipY ? Math.max(pad, y - cardH - pad) : y + pad,
        width: cardW,
    }

    return (
        <div
            className="pointer-events-none absolute z-20 rounded-sm border border-[#2A3140] bg-[#0B0F18]/97 px-3 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.55)]"
            style={style}
        >
            <p className="text-[#F2F5FA] text-[13px] font-semibold leading-tight mb-1">
                {country.country}
            </p>
            <p className="text-[#C5CDD8] text-[11px] leading-[15px]">
                Risk {score} · {country.risk_tier} · confidence {conf}
            </p>
            <p className="text-[#9AA3B5] text-[11px] leading-[15px] mt-0.5">
                Change 1h {d?.d1h ?? '—'} · 24h {d?.d24h ?? '—'} · 7d {d?.d7d ?? '—'}
            </p>
            <p className="text-[#9AA3B5] text-[11px] leading-[15px] mt-0.5">
                Structural {structural} · Tactical {tactical} · Market {market}
            </p>
            <p className="text-[#9AA3B5] text-[11px] leading-[15px] mt-0.5">
                Catalyst: {d?.catalyst ?? country.top_category ?? '—'}
            </p>
            <div className="mt-1.5 pt-1.5 border-t border-[#1E2430] space-y-0.5">
                <p className="text-[#8B93A5] text-[10px] leading-[14px]">
                    GDP {d?.gdp ?? '—'} · Growth {d?.growth ?? '—'} · CPI {d?.cpi ?? '—'}
                </p>
                <p className="text-[#8B93A5] text-[10px] leading-[14px]">
                    Debt {d?.debt ?? '—'} · Current account {d?.current_account ?? '—'} · Reserves{' '}
                    {d?.reserves ?? '—'}
                </p>
                <p className="text-[#8B93A5] text-[10px] leading-[14px]">
                    Unemployment {d?.unemployment ?? '—'} · Trade/GDP {d?.trade ?? '—'} · Military/GDP{' '}
                    {d?.military ?? '—'}
                </p>
            </div>
            <p className="text-[#8B93A5] text-[10px] leading-[14px] mt-1.5 pt-1.5 border-t border-[#1E2430]">
                Top transmission: {d?.mkt_asset ?? '—'} {d?.mkt_dir && d.mkt_dir !== '—' ? d.mkt_dir : ''}
                {d?.mkt_sens && d.mkt_sens !== '—'
                    ? ` · sensitivity ${d.mkt_sens} · ${d.mkt_conf ?? '—'} confidence`
                    : ''}
            </p>
        </div>
    )
}
