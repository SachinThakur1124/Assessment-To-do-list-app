/**
 * Lightweight loading skeleton for week summary cards
 */
export default function LoadingState() {
  return (
    <div className="space-y-3" role="status" aria-label="Loading tasks">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-full rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-sm animate-pulse space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 bg-surface-hover rounded-md w-44" />
            <div className="h-4 bg-surface-hover rounded-md w-5" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-3 bg-surface-hover rounded-md w-16" />
            <div className="h-3 bg-surface-hover rounded-md w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

