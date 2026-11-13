/**
 * Presentational card for a single task.
 *
 * Props:
 *   task           – { id, title, description, dateTime, priority, status }
 *   onToggleStatus – callback(id) to toggle In Progress ↔ Completed
 *   onEdit         – callback(task) for edit
 *   onDelete       – callback(task) for delete confirmation
 */

import { formatDateTime } from '../../utils/dateUtils'
import { Calendar, Pencil, Trash } from '../layout/icons'
import PriorityBadge from './PriorityBadge'
import StatusToggle from './StatusToggle'

export default function TaskCard({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className={`
        rounded-xl border bg-surface p-4 sm:p-5
        transition-all duration-200 shadow-sm hover:shadow-card
        ${task.status === 'completed' ? 'border-border bg-surface-alt/50 opacity-80' : 'border-border'}
      `}
    >
      {/* ─── Top row: priority + status & actions ─── */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <PriorityBadge priority={task.priority} />
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit?.(task)}
              aria-label={`Edit task "${task.title}"`}
              title="Edit task"
              className="p-1 rounded-lg text-text-tertiary hover:text-primary-600 hover:bg-surface-hover transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete?.(task)}
              aria-label={`Delete task "${task.title}"`}
              title="Delete task"
              className="p-1 rounded-lg text-text-tertiary hover:text-danger hover:bg-danger-bg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-danger"
            >
              <Trash className="w-3.5 h-3.5" />
            </button>
          )}

          <StatusToggle
            status={task.status}
            onChange={() => onToggleStatus?.(task.id)}
          />
        </div>
      </div>

      {/* ─── Title ─── */}
      <h3
        className={`text-sm font-semibold leading-snug mb-1 break-words ${
          task.status === 'completed'
            ? 'line-through text-text-tertiary'
            : 'text-text-primary'
        }`}
      >
        {task.title}
      </h3>

      {/* ─── Description ─── */}
      {task.description && (
        <p
          className={`text-xs leading-relaxed mb-3 line-clamp-2 break-words ${
            task.status === 'completed' ? 'text-text-tertiary' : 'text-text-secondary'
          }`}
        >
          {task.description}
        </p>
      )}

      {/* ─── Date/time ─── */}
      <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
        <Calendar className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">{formatDateTime(task.dateTime)}</span>
      </div>
    </div>
  )
}
