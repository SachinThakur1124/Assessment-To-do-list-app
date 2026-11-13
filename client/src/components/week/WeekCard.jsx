import { isCurrentWeek } from '../../utils/dateUtils'
import { Calendar, CheckCircle, ChevronRight, Clock } from '../layout/icons'

/**
 * Presentational card for a single week group.
 *
 * Props:
 *   weekKey        – "YYYY-MM-DD" Monday key (used for navigation in Phase 4)
 *   weekLabel      – Human-readable range, e.g. "Nov 9 – 15, 2026"
 *   openCount      – Number of in-progress tasks
 *   completedCount – Number of completed tasks
 *   onClick        – Callback when the card is clicked
 */
export default function WeekCard({
  weekKey,
  weekLabel,
  openCount,
  completedCount,
  onClick,
}) {
  const isCurrent = isCurrentWeek(weekKey)
  const totalCount = openCount + completedCount

  return (
    <button
      type="button"
      onClick={() => onClick?.(weekKey)}
      className={`
        w-full text-left rounded-xl border p-4 sm:p-5
        transition-all duration-200 cursor-pointer
        group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
        ${
          isCurrent
            ? 'border-primary-200 bg-primary-50 shadow-card hover:shadow-md'
            : 'border-border bg-surface shadow-sm hover:shadow-card hover:border-primary-100'
        }
      `}
    >
      {/* ─── Top row: label + chevron ─── */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Calendar
            className={`w-4 h-4 shrink-0 ${
              isCurrent ? 'text-primary-600' : 'text-text-tertiary'
            }`}
          />
          <span
            className={`text-sm font-semibold truncate ${
              isCurrent ? 'text-primary-700' : 'text-text-primary'
            }`}
          >
            {weekLabel}
          </span>

          {isCurrent && (
            <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary-600 text-text-inverse">
              Current
            </span>
          )}
        </div>

        <ChevronRight
          className="w-4 h-4 shrink-0 text-text-tertiary group-hover:text-primary-600 transition-colors"
        />
      </div>

      {/* ─── Counts row ─── */}
      <div className="flex items-center gap-4 text-xs">
        {/* Open / In-progress */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-status-progress" />
          <span className="text-text-secondary">
            <span className="font-medium text-text-primary">{openCount}</span> open
          </span>
        </div>

        {/* Completed */}
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-status-completed" />
          <span className="text-text-secondary">
            <span className="font-medium text-text-primary">{completedCount}</span> done
          </span>
        </div>

        {/* Total */}
        <span className="text-text-tertiary ml-auto">
          {totalCount} {totalCount === 1 ? 'task' : 'tasks'}
        </span>
      </div>
    </button>
  )
}

