import { CheckCircle, Clock } from '../layout/icons'

/**
 * Task summary cards matching Figma with Dark Mode support:
 * - Left: "Task Complete" with light blue bg, blue check icon, count, "This Week"
 * - Right: "Task Pending" with light red/pink bg, red clock icon, count, "This Week"
 */
export default function TaskSummary({ completedCount = 0, pendingCount = 0 }) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {/* ─── Task Complete (Light Blue) ─── */}
      <div className="bg-[#EBF3FE] dark:bg-slate-800 border border-[#D5E6FB] dark:border-blue-900/40 rounded-2xl p-4 flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-text-secondary dark:text-slate-300">
            Task Complete
          </span>
          <div className="w-7 h-7 rounded-full bg-primary-600/10 dark:bg-primary-600/20 flex items-center justify-center text-primary-600 dark:text-blue-400">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold text-text-primary dark:text-white tracking-tight">
            {completedCount}
          </div>
          <span className="text-[11px] text-text-tertiary dark:text-slate-400">
            This Week
          </span>
        </div>
      </div>

      {/* ─── Task Pending (Light Pink/Red) ─── */}
      <div className="bg-[#FEF0F0] dark:bg-slate-800 border border-[#FCDADA] dark:border-red-900/40 rounded-2xl p-4 flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-text-secondary dark:text-slate-300">
            Task Pending
          </span>
          <div className="w-7 h-7 rounded-full bg-[#EF4444]/10 dark:bg-[#EF4444]/20 flex items-center justify-center text-[#EF4444] dark:text-red-400">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold text-text-primary dark:text-white tracking-tight">
            {pendingCount}
          </div>
          <span className="text-[11px] text-text-tertiary dark:text-slate-400">
            This Week
          </span>
        </div>
      </div>
    </div>
  )
}
