// ── MarketCard - individual instrument card ───────────────────────────────────

import MiniPriceLine from './MiniPriceLine'

interface DealerLevel {
  label: string
  level: number
  change: string
  positive: boolean
}

interface MarketCardProps {
  ticker: string
  regime: string
  regimeColor: string
  name: string
  price: string
  change: string
  changePositive: boolean
  dealerBias: string
  trendDay: string
  odteDom: string
  meanRevert: string
  volRegime: string
  levels: DealerLevel[]
  summary: string
  tags: string[]
  /** Compact OHLC sparkline points (Analysis blue) */
  priceLine?: number[]
}

export default function MarketCard({
  ticker,
  regime,
  regimeColor,
  name,
  price,
  change,
  changePositive,
  dealerBias,
  trendDay,
  odteDom,
  meanRevert,
  volRegime,
  levels,
  summary,
  tags,
  priceLine = [],
}: MarketCardProps) {
  return (
    <div className="bg-[#16161F] flex flex-col min-w-0 p-3 sm:p-6 h-full">
      {/* ── Top: ticker + price ── */}
      <div className="flex items-center justify-between gap-3 border-b border-[#FFFFFF0D] pb-3 sm:pb-4">
        <div className="min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <span className="text-white text-[26px] sm:text-[34px] font-medium leading-tight">{ticker}</span>
            <span
              className="mt-1.5 text-[12px] leading-4 font-medium"
              style={{ color: regimeColor, borderColor: `${regimeColor}40` }}
            >
              {regime}
            </span>
          </div>
          <span className="text-[#838388] text-[13px] sm:text-[14px] leading-5 font-normal">{name}</span>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-white text-[20px] sm:text-[24px] font-medium leading-tight">{price}</p>
          <span
            className={`text-[13px] sm:text-[14px] leading-[17px] font-medium ${
              changePositive ? 'text-[#2CB37BB3]' : 'text-[#E25C3F]'
            }`}
          >
            {change}
          </span>
        </div>
      </div>

      {/* ── Compact blue price line ── */}
      <div className="py-2.5 sm:py-3 border-b border-[#FFFFFF0D]">
        <MiniPriceLine points={priceLine} />
      </div>

      {/* ── Dealer Bias ── */}
      <div className="border-b border-[#FFFFFF0D] mt-3 sm:mt-4 pb-3 sm:pb-4 mb-3 sm:mb-4">
        <p className="text-white/60 text-[12px] leading-[14px] mb-1">Dealer Bias</p>
        <p className="text-white text-[16px] leading-[19px] font-medium">{dealerBias}</p>
      </div>

      {/* ── Stats row ── */}
      <div className="flex flex-wrap items-start gap-x-4 gap-y-3 border-b border-[#FFFFFF0D] pb-3 sm:pb-4 mb-3 sm:mb-4">
        {[
          { label: 'Trend Day', val: trendDay },
          { label: 'Odte Dom', val: odteDom },
          { label: 'Mean Revert', val: meanRevert },
          { label: 'Vol Regime', val: volRegime },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-1 min-w-[60px]">
            <span className="text-white/60 text-[12px] leading-[14px] font-normal">{s.label}</span>
            <span
              className={`text-[16px] font-semibold leading-[19px] ${
                s.label === 'Vol Regime' ? 'text-[#E25C3F]' : 'text-white'
              }`}
            >
              {s.val}
            </span>
          </div>
        ))}
      </div>

      {/* ── Mechanical Dealer Levels ── */}
      <div className="mb-3 sm:mb-4">
        <p className="text-white/50 text-[10px] leading-[12px] font-normal mb-3">Mechanical Dealer Levels</p>
        <div className="w-full flex flex-col gap-1.5">
          {levels.map((l) => (
            <div key={l.label} className="bg-[#FFFFFF08] p-3 grid grid-cols-3 w-full">
              <p className="text-white text-[12px] leading-[14px] font-medium flex-shrink-0">{l.label}</p>
              <p className="text-white text-[12px] leading-[14px] font-medium text-center">
                {l.level.toLocaleString()}
              </p>
              <p
                className={`text-[12px] leading-[14px] font-medium text-right ${
                  l.positive ? 'text-[#2CB37BB3]' : 'text-[#E25C3F]'
                }`}
              >
                {l.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Summary ── */}
      <div className="pt-3 sm:pt-4 border-t border-[#FFFFFF0D] mt-auto">
        <p className="text-white/60 text-[12px] leading-[17px] mb-3 sm:mb-4">{summary}</p>
        <div className="flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-[#FFFFFF1A] text-white/60 text-[12px] leading-[17px] font-normal hover:text-white hover:border-[#FFFFFF25] transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
