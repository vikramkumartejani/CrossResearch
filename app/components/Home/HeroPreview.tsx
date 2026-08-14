import Link from 'next/link'

type Variant = 'left' | 'center' | 'right'

function Metric({ label, value, up }: { label: string; value: string; up?: boolean }) {
  return (
    <div className="rounded-[10px] bg-white/[0.04] border border-white/[0.06] px-2.5 py-2">
      <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-white/35 mb-0.5">{label}</p>
      <p className={`text-[12px] sm:text-[14px] font-medium ${up === false ? 'text-[#F07171]' : 'text-[#88C4FF]'}`}>
        {value}
      </p>
    </div>
  )
}

function MockDash({ variant, chartId }: { variant: Variant; chartId: string }) {
  return (
    <div className="relative w-full rounded-[18px] sm:rounded-[22px] border border-white/[0.10] bg-[#14141E] shadow-[0_24px_80px_rgba(0,0,0,0.45)] overflow-hidden aspect-[16/10]">
      <div className="flex items-center gap-2 px-3 sm:px-4 h-8 sm:h-10 border-b border-white/[0.06] bg-white/[0.03]">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <div className="ml-2 h-2 w-24 sm:w-36 rounded-full bg-white/[0.06]" />
        <div className="ml-auto h-2 w-10 rounded-full bg-white/[0.05]" />
      </div>

      <div className="grid grid-cols-12 gap-2 p-2 sm:p-3 h-[calc(100%-2.5rem)]">
        <div className="col-span-2 hidden sm:flex flex-col gap-1.5 rounded-[10px] bg-white/[0.03] p-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full ${i === (variant === 'right' ? 3 : 1) ? 'bg-[#88C4FF]/50 w-full' : 'bg-white/10 w-[70%]'}`}
            />
          ))}
        </div>

        <div className="col-span-12 sm:col-span-10 flex flex-col gap-2 min-h-0">
          {variant === 'right' ? (
            <div className="flex-1 grid grid-cols-2 gap-2 min-h-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-[10px] bg-white/[0.04] border border-white/[0.05] p-2 flex flex-col justify-between">
                  <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
                  <div className="h-8 rounded bg-white/[0.04]" style={{ width: `${40 + (i * 9) % 50}%` }} />
                </div>
              ))}
            </div>
          ) : variant === 'left' ? (
            <div className="flex-1 grid grid-cols-8 grid-rows-5 gap-1 min-h-0">
              {Array.from({ length: 40 }).map((_, i) => {
                const t = (i * 17) % 100
                return (
                  <div
                    key={i}
                    className="rounded-[3px]"
                    style={{
                      background:
                        t > 70
                          ? 'rgba(136,196,255,0.45)'
                          : t > 40
                            ? 'rgba(136,196,255,0.18)'
                            : 'rgba(255,255,255,0.05)',
                    }}
                  />
                )
              })}
            </div>
          ) : (
            <div className="flex-1 rounded-[10px] bg-white/[0.03] border border-white/[0.05] relative overflow-hidden min-h-0">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id={chartId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#88C4FF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#88C4FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 118 C 50 108, 80 42, 120 68 S 190 28, 240 54 S 310 96, 400 22"
                  fill="none"
                  stroke="#88C4FF"
                  strokeWidth="2.4"
                />
                <path
                  d="M0 118 C 50 108, 80 42, 120 68 S 190 28, 240 54 S 310 96, 400 22 L 400 160 L 0 160 Z"
                  fill={`url(#${chartId})`}
                />
              </svg>
            </div>
          )}

          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 shrink-0">
            <Metric label="PnL" value="+12.4%" />
            <Metric label="Win rate" value="68%" />
            <Metric label="Drawdown" value="-3.1%" up={false} />
            <Metric label="Signals" value="24" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HeroPreview() {
  return (
    <div className="relative w-full h-[300px] sm:h-[420px] lg:h-[540px] xl:h-[600px] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-[820px] h-[55%] rounded-full bg-[#88C4FF]/30 blur-[90px]"
      />

      <div className="absolute top-[10%] left-[-18%] sm:left-[-12%] lg:left-[-8%] w-[58%] max-w-[760px] opacity-[0.18] sm:opacity-[0.22] pointer-events-none select-none">
        <MockDash variant="left" chartId="hero-chart-l" />
      </div>

      <div className="absolute top-[10%] right-[-18%] sm:right-[-12%] lg:right-[-8%] w-[58%] max-w-[760px] opacity-[0.18] sm:opacity-[0.22] pointer-events-none select-none">
        <MockDash variant="right" chartId="hero-chart-r" />
      </div>

      <div className="absolute left-1/2 top-[6%] -translate-x-1/2 w-[88%] sm:w-[78%] lg:w-[70%] max-w-[920px] z-10">
        <MockDash variant="center" chartId="hero-chart-c" />

        <Link
          href="/signup"
          className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#88C4FF] text-[#0B0B14] text-[13px] sm:text-[16px] lg:text-[18px] font-semibold px-5 sm:px-8 lg:px-10 h-10 sm:h-12 lg:h-[52px] shadow-[0_0_0_1px_rgba(136,196,255,0.35),0_0_36px_8px_rgba(136,196,255,0.45)] hover:bg-[#9DD0FF] transition-colors"
        >
          Explore the Platform
        </Link>
      </div>
    </div>
  )
}
