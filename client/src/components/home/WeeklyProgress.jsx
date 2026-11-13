/**
 * Weekly progress bar section matching Figma with Dark Mode support.
 */
export default function WeeklyProgress({ completedCount = 0, totalCount = 0 }) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="w-full bg-white dark:bg-slate-800 border border-border/80 dark:border-slate-700 rounded-2xl p-4 shadow-xs space-y-2.5 transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-text-primary dark:text-white">
          Weekly Progress
        </h3>
        <span className="text-xs font-bold text-primary-600 dark:text-blue-400">
          {percentage}%
        </span>
      </div>

      {/* Progress track */}
      <div className="w-full h-2.5 bg-[#EDF2F7] dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 dark:bg-blue-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-text-tertiary dark:text-slate-400">
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
