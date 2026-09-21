'use client'

import StatsBar from './StatsBar'
import NowcastsGrid from './NowcastsGrid'
import KeyNowcastsTable from './KeyNowcastsTable'
import NowcastPathChart from './NowcastPathChart'
import RegimeProbabilityMatrix from './RegimeProbabilityMatrix'
import UpcomingReleases from './UpcomingReleases'
import LockedSection from '../LockedSection'
import { NowcastDataProvider } from './nowcastData'

export default function MacroNowcast() {
  return (
    <NowcastDataProvider>
      <div>
        <div className="border-b border-[#FFFFFF0D] pb-6 mb-5 px-4 lg:px-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-white text-[26px] sm:text-[35px] font-medium leading-tight sm:leading-[42px] mb-2">
              Probability Signals & Sentiment
            </h1>
            <p className="text-[#838388] text-[12px] leading-[17px]">
              Cross - venue prediction - market intelligence. We aggregate polymarket, Kalshi, Predictlt, manifold &
              meticulous into a single belief lattice - then surface the moves that matter.
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            <p className="text-[12px] leading-[18px] font-medium">
              Market State <span className="text-[14px] leading-[18px] font-semibold">Divergent</span>
            </p>
          </div>
        </div>

        <div className="px-4 lg:px-6 flex flex-col gap-4">
          <StatsBar />

          <LockedSection title="Nowcast Grid" keepTitle={false} showHeading={false}>
            <div className="mb-2">
              <h2 className="text-white text-[18px] font-medium leading-[22px] mb-1">Nowcasts</h2>
              <p className="text-[#838388] text-[14px] leading-[20px]">
                Model-driven current-quarter / current-period estimates vs consensus
              </p>
            </div>

            <NowcastsGrid
              compact
              fillHeight
              paginationBelow
              leftColumn={
                <>
                  <div className="shrink-0">
                    <KeyNowcastsTable />
                  </div>
                  <div className="flex-1 min-h-[280px] flex flex-col">
                    <NowcastPathChart />
                  </div>
                </>
              }
            />
          </LockedSection>

          <LockedSection title="Regime Probability">
            <RegimeProbabilityMatrix />
          </LockedSection>
          <LockedSection title="Upcoming Releases">
            <UpcomingReleases />
          </LockedSection>
        </div>
      </div>
    </NowcastDataProvider>
  )
}
