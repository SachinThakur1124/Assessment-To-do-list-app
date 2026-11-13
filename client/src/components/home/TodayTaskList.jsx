import TaskRow from '../task/TaskRow'
import EmptyState from '../common/EmptyState'

/**
 * Tasks Today Section matching Figma:
 * - "Tasks Today" heading
 * - "View All" link
 * - List of TaskRows with dividers
 */
export default function TodayTaskList({
  tasks = [],
  onToggleStatus,
  onEditTask,
  onDeleteTask,
  onViewAll,
}) {
  return (
    <div className="w-full bg-white border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-sm font-bold text-text-primary">
          Tasks Today
        </h3>
        {tasks.length > 0 && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
          >
            View All
          </button>
        )}
      </div>

      {/* ─── Task List or Empty ─── */}
      {tasks.length === 0 ? (
        <EmptyState
          title="No tasks scheduled for today"
          message="Tap the + button below to add your first task."
        />
      ) : (
        <div className="divide-y divide-border/40">
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  )
}

