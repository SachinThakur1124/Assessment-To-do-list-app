/**
 * Weekly progress bar section matching Figma:
 * - "Weekly Progress" title
 * - Percentage calculated from: Math.round((completedCount / totalCount) * 100) (or 0 when totalCount === 0)
 * - Smooth horizontal blue progress bar
 * - Dynamic helper text: "X of Y tasks completed"
 */
export default function WeeklyProgress({ completedCount = 0, totalCount = 0 }) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="w-full bg-white border border-border/80 rounded-2xl p-4 shadow-xs space-y-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-text-primary">
          Weekly Progress
        </h3>
        <span className="text-xs font-bold text-primary-600">
          {percentage}%
        </span>
      </div>

      {/* Progress track */}
      <div className="w-full h-2.5 bg-[#EDF2F7] rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-text-tertiary">
        <span>
          {completedCount} of {totalCount} {totalCount === 1 ? 'task' : 'tasks'} completed
        </span>
        <span>
          {totalCount - completedCount} pending
        </span>
      </div>
    </div>
  )
}
