import { useMemo, useState } from 'react'

import { searchTasks } from '../utils/taskUtils'
import EmptyState from '../components/common/EmptyState'
import SearchBar from '../components/common/SearchBar'
import TaskCard from '../components/task/TaskCard'
import { ArrowLeft, Calendar, CheckCircle, Clock } from '../components/layout/icons'

/**
 * Week Detail View:
 * Displays all tasks for the selected week with local search, status toggle, edit, and delete actions.
 *
 * Props:
 *   weekGroup - { weekKey, weekLabel, tasks, openCount, completedCount }
 *   onBack - callback to return to Home view
 *   onToggleStatus - callback(taskId)
 *   onEditTask - callback(task)
 *   onDeleteTask - callback(task)
 */
export default function WeekDetailPage({
  weekGroup,
  onBack,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}) {
  const [searchQuery, setSearchQuery] = useState('')

  const allWeekTasks = weekGroup?.tasks || []

  // Filter tasks locally by search query
  const filteredTasks = useMemo(() => {
    return searchTasks(allWeekTasks, searchQuery)
  }, [allWeekTasks, searchQuery])

  // Empty week or non-existent week state (e.g. all tasks deleted)
  if (!weekGroup || allWeekTasks.length === 0) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all weeks</span>
        </button>
        <EmptyState
          title="No tasks in this week"
          message="All tasks for this week have been completed or removed."
        />
      </div>
    )
  }

  const { weekLabel, openCount, completedCount } = weekGroup
  const totalCount = openCount + completedCount

  return (
    <div className="space-y-6">
      {/* ─── Back Button & Header ─── */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all weeks</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600 shrink-0" />
              <h2 className="text-xl font-semibold text-text-primary truncate">
                {weekLabel}
              </h2>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              Review and manage tasks for this week.
            </p>
          </div>

          {/* Counts overview */}
          <div className="flex items-center gap-3 text-xs bg-surface border border-border rounded-lg px-3 py-1.5 self-start sm:self-auto shadow-sm">
            <span className="flex items-center gap-1 text-text-secondary">
              <Clock className="w-3.5 h-3.5 text-status-progress" />
              <strong className="text-text-primary">{openCount}</strong> open
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1 text-text-secondary">
              <CheckCircle className="w-3.5 h-3.5 text-status-completed" />
              <strong className="text-text-primary">{completedCount}</strong> done
            </span>
            <span className="text-border">|</span>
            <span className="text-text-tertiary">
              {totalCount} total
            </span>
          </div>
        </div>
      </div>

      {/* ─── Search Bar ─── */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search this week's tasks by title or description..."
      />

      {/* ─── Task List or No-results State ─── */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No matching tasks"
          message={`No tasks matching "${searchQuery}" in this week.`}
        />
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskCard
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
