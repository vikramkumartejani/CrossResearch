import { redirect } from 'next/navigation'

/** Architecture root for indicators - lands on the TradingView hub. */
export default function IndicatorsIndexPage() {
  redirect('/indicators/tradingview')
}
