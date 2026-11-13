import { ClipboardList, Plus } from './icons'

export default function Header({ onAddTask }) {
  return (
    <header className="sticky top-0 z-30 bg-surface border-b border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-primary-600" />
          <h1 className="text-lg font-semibold text-text-primary tracking-tight">
            Task Manager
          </h1>
        </div>

        {/* Add Task Button — wired in Phase 5 */}
        <button
          type="button"
          onClick={onAddTask}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                     bg-primary-600 text-text-inverse hover:bg-primary-700
                     transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Task</span>
        </button>
      </div>
    </header>
  )
}

