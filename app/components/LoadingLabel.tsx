export function Spinner({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2.4" />
      <path d="M18 10a8 8 0 0 0-8-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

/** Keeps the idle label’s width while swapping in a spinner. */
export default function LoadingLabel({
  loading,
  children,
}: {
  loading: boolean
  children: React.ReactNode
}) {
  return (
    <span className="relative inline-flex items-center justify-center">
      <span className={loading ? 'invisible' : undefined}>{children}</span>
      {loading ? (
        <span className="absolute inset-0 grid place-items-center">
          <Spinner />
        </span>
      ) : null}
    </span>
  )
}
