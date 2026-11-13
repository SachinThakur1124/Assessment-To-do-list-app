import { CheckCircle, Pencil, Trash } from '../layout/icons'
import PriorityBadge from './PriorityBadge'

/**
 * Task Row matching Figma:
 * - Checkbox on the left (blue when active)
 * - Task title & priority badge (strikethrough when completed)
 * - Time range or description when available
 * - Edit & delete action icons on the right
 * - Thin divider
 */
export default function TaskRow({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) {
  const isCompleted = task.status === 'completed'

  // Format time display: e.g. "09:00 - 10:30" or "09:00"
  const timeDisplay = task.startTime && task.endTime
    ? `${task.startTime} - ${task.endTime}`
    : task.startTime || ''

  return (
    <div className="flex items-center justify-between py-3 px-1 border-b border-border/50 dark:border-slate-700/60 last:border-b-0 group">
      {/* ─── Left: Checkbox + Title / Subtitle + Priority Badge ─── */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onToggleStatus?.(task.id)}
          aria-label={isCompleted ? 'Mark as In Progress' : 'Mark as Completed'}
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer shrink-0
            ${
              isCompleted
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'border-border dark:border-slate-600 hover:border-primary-400 bg-white dark:bg-slate-700'
            }`}
        >
          {isCompleted && (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>

        <div className="min-w-0 pr-2 space-y-0.5">
          <div className="flex items-center gap-2">
            <h4
              className={`text-xs sm:text-sm font-semibold truncate ${
                isCompleted ? 'line-through text-text-tertiary dark:text-slate-500' : 'text-text-primary dark:text-white'
              }`}
            >
              {task.title}
            </h4>
            <PriorityBadge priority={task.priority} />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-text-tertiary dark:text-slate-400">
            {timeDisplay && (
              <span className="font-medium text-text-secondary dark:text-slate-300">
                {timeDisplay}
              </span>
            )}
            {timeDisplay && task.description && <span>•</span>}
            {task.description && (
              <p className="truncate max-w-[200px] sm:max-w-xs">
                {task.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ─── Right: Actions ─── */}
      <div className="flex items-center gap-1 shrink-0">
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit?.(task)}
            aria-label="Edit task"
            className="p-1 rounded-lg text-text-tertiary dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-surface-hover dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete?.(task)}
            aria-label="Delete task"
            className="p-1 rounded-lg text-text-tertiary dark:text-slate-400 hover:text-danger hover:bg-danger-bg dark:hover:bg-red-950/40 transition-colors cursor-pointer"
          >
            <Trash className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
