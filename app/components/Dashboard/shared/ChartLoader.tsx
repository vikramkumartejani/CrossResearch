export default function ChartLoader({
  light = false,
  className = '',
}: {
  light?: boolean
  className?: string
}) {
  return (
    <div
      className={`flex flex-1 min-h-[180px] w-full items-center justify-center ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className={`cr-chart-loader ${light ? 'text-[#0F172A]' : 'text-white'}`} />
    </div>
  )
}
