import { useState } from 'react'
import { ArrowLeft, Search, XMark } from '../components/layout/icons'
import TaskRow from '../components/task/TaskRow'
import EmptyState from '../components/common/EmptyState'
import { searchTasks } from '../utils/taskUtils'

/**
 * Dedicated Search Screen matching Figma:
 * - Top bar with Back Arrow button and "Search Tasks" header
 * - Full Search Input with instant filtering by title & description
 * - Clear button (X) when query is present
 * - Live list of matching tasks using TaskRow
 * - Checkbox status toggle, edit, and delete support
 * - Clear no-results empty state
 */
export default function SearchScreen({
  tasks = [],
  onBack,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}) {
  const [query, setQuery] = useState('')

  const filteredTasks = searchTasks(tasks, query)

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pb-20 flex flex-col">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-6 space-y-5">
        {/* Top Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to home"
            className="w-10 h-10 rounded-2xl bg-white border border-border/80 flex items-center justify-center text-text-secondary hover:text-text-primary shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              Search Tasks
            </h2>
            <p className="text-xs text-text-tertiary">
              Find tasks across all weeks by title or description
            </p>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type task title or description..."
            aria-label="Search task input"
            className="w-full bg-white border border-border/80 rounded-2xl py-3 pl-11 pr-11 text-sm text-text-primary placeholder:text-text-tertiary shadow-xs focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
          />
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary-600">
            <Search className="w-4 h-4" />
          </div>
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search query"
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-tertiary hover:text-text-primary cursor-pointer"
            >
              <XMark className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="bg-white border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-border/40 mb-2">
            <span className="text-xs font-semibold text-text-secondary">
              Results {query && `for "${query}"`}
            </span>
            <span className="text-xs text-text-tertiary">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
            </span>
          </div>

          {filteredTasks.length === 0 ? (
            <EmptyState
              title={query ? 'No matching tasks' : 'No tasks found'}
              message={
                query
                  ? `No tasks matched your search for "${query}". Try another term.`
                  : 'Your task list is currently empty.'
              }
            />
          ) : (
            <div className="divide-y divide-border/40">
              {filteredTasks.map((task) => (
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
      </div>
    </div>
  )
}

