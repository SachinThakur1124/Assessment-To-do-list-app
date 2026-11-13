import { useState } from 'react'
import { ArrowLeft, Search, XMark } from '../components/layout/icons'
import ThemeToggle from '../components/common/ThemeToggle'
import TaskRow from '../components/task/TaskRow'
import EmptyState from '../components/common/EmptyState'
import { searchTasks } from '../utils/taskUtils'

/**
 * Dedicated Search Screen matching Figma:
 * - Top bar with Back Arrow button, Title, and ThemeToggle
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
  isDark = false,
  onToggleTheme,
}) {
  const [query, setQuery] = useState('')

  const filteredTasks = searchTasks(tasks, query)

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] dark:bg-slate-900 pb-20 flex flex-col transition-colors duration-200">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-6 space-y-5">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to home"
              className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-border/80 dark:border-slate-700 flex items-center justify-center text-text-secondary dark:text-slate-300 hover:text-text-primary dark:hover:text-white shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-text-primary dark:text-white">
                Search Tasks
              </h2>
              <p className="text-xs text-text-tertiary dark:text-slate-400">
                Find tasks across all weeks by title or description
              </p>
            </div>
          </div>

          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
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
            className="w-full bg-white dark:bg-slate-800 border border-border/80 dark:border-slate-700 rounded-2xl py-3 pl-11 pr-11 text-sm text-text-primary dark:text-white placeholder:text-text-tertiary dark:placeholder:text-slate-400 shadow-xs focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
          />
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary-600">
            <Search className="w-4 h-4" />
          </div>
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search query"
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-tertiary dark:text-slate-400 hover:text-text-primary dark:hover:text-white cursor-pointer"
            >
              <XMark className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="bg-white dark:bg-slate-800 border border-border/80 dark:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-border/40 dark:border-slate-700 mb-2">
            <span className="text-xs font-semibold text-text-secondary dark:text-slate-300">
              Results {query && `for "${query}"`}
            </span>
            <span className="text-xs text-text-tertiary dark:text-slate-400">
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
            <div className="divide-y divide-border/40 dark:divide-slate-700">
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
