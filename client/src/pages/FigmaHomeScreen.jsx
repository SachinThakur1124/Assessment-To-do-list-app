import { Bell, Plus, Settings } from '../components/layout/icons'
import ThemeToggle from '../components/common/ThemeToggle'
import SearchInput from '../components/home/SearchInput'
import WeekDateSelector from '../components/home/WeekDateSelector'
import TaskSummary from '../components/home/TaskSummary'
import WeeklyProgress from '../components/home/WeeklyProgress'
import TodayTaskList from '../components/home/TodayTaskList'
import LoadingState from '../components/common/LoadingState'
import ErrorState from '../components/common/ErrorState'

/**
 * Responsive Figma Home Screen with Theme Toggle in Top Bar:
 * - Mobile: full width with padding (320px - 640px)
 * - Tablet: expands naturally with readable max-width (641px - 1024px)
 * - Desktop: 2-column balanced dashboard view (1024px+)
 */
export default function FigmaHomeScreen({
  tasks = [],
  completedCount = 0,
  pendingCount = 0,
  selectedDate,
  onSelectDate,
  weekDays = [],
  onOpenSearch,
  onOpenCreate,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
  onViewAll,
  isLoading = false,
  error = null,
  onRetry,
  isDark = false,
  onToggleTheme,
}) {
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] dark:bg-slate-900 pb-24 flex flex-col transition-colors duration-200">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-6 space-y-5 sm:space-y-6">
        {/* ─── 1. Top Controls: Settings, Title, Theme Toggle & Bell ─── */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Settings"
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-border/80 dark:border-slate-700 flex items-center justify-center text-text-secondary dark:text-slate-300 hover:text-text-primary dark:hover:text-white shadow-xs transition-colors cursor-pointer"
          >
            <Settings className="w-5 h-5" />
          </button>

          <h2 className="text-base sm:text-lg font-bold text-text-primary dark:text-white tracking-tight">
            To-Do List
          </h2>

          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            {/* Notification Bell */}
            <button
              type="button"
              aria-label="Notifications"
              className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-border/80 dark:border-slate-700 flex items-center justify-center text-text-secondary dark:text-slate-300 hover:text-text-primary dark:hover:text-white shadow-xs transition-colors cursor-pointer relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary-600" />
            </button>
          </div>
        </div>

        {/* ─── 2. Search Input Bar ─── */}
        <div className="max-w-xl mx-auto w-full">
          <SearchInput
            readOnly
            onClick={onOpenSearch}
            placeholder="Search Task"
          />
        </div>

        {/* ─── Loading or Error States ─── */}
        {isLoading && <LoadingState />}
        {!isLoading && error && (
          <ErrorState message={error} onRetry={onRetry} />
        )}

        {/* ─── 3. Main Content Area (Responsive Grid on Desktop) ─── */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Left column on desktop: Date Selector, Summaries & Progress */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              {/* Horizontal 7-Day Date Selector */}
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xs p-2 rounded-2xl border border-border/60 dark:border-slate-700">
                <WeekDateSelector
                  selectedDate={selectedDate}
                  onSelectDate={onSelectDate}
                  weekDays={weekDays}
                />
              </div>

              {/* Task Complete / Pending Summary Cards */}
              <TaskSummary
                completedCount={completedCount}
                pendingCount={pendingCount}
              />

              {/* Weekly Progress Bar */}
              <WeeklyProgress
                completedCount={completedCount}
                totalCount={completedCount + pendingCount}
              />
            </div>

            {/* Right column on desktop: Tasks Today List */}
            <div className="lg:col-span-7">
              <TodayTaskList
                tasks={tasks}
                onToggleStatus={onToggleStatus}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
                onViewAll={onViewAll}
              />
            </div>
          </div>
        )}
      </div>

      {/* ─── Floating Action Button (+) ─── */}
      <div className="fixed bottom-6 right-6 sm:right-8 lg:bottom-8 lg:right-10 z-30">
        <button
          type="button"
          onClick={onOpenCreate}
          aria-label="Create new task"
          className="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 active:scale-95 text-white flex items-center justify-center shadow-xl shadow-primary-600/35 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>
    </div>
  )
}
