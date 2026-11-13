import EmptyState from '../components/common/EmptyState'
import ErrorState from '../components/common/ErrorState'
import LoadingState from '../components/common/LoadingState'
import WeekCard from '../components/week/WeekCard'

/**
 * Home page — renders weekly summary cards, loading skeletons, or error states.
 *
 * Props:
 *   weekGroups - array of { weekKey, weekLabel, openCount, completedCount }
 *   onWeekClick - callback(weekKey)
 *   isLoading - boolean
 *   error - string | null
 *   onRetry - callback()
 */
export default function HomePage({
  weekGroups = [],
  onWeekClick,
  isLoading = false,
  error = null,
  onRetry,
}) {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary">My Tasks</h2>
        <p className="text-sm text-text-secondary mt-1">
          Organized by week — click a week to view its tasks.
        </p>
      </div>

      {/* Loading state */}
      {isLoading && <LoadingState />}

      {/* Error state */}
      {!isLoading && error && (
        <ErrorState
          title="Could not load tasks"
          message={error}
          onRetry={onRetry}
        />
      )}

      {/* Empty state (only when no error and no loading) */}
      {!isLoading && !error && weekGroups.length === 0 && (
        <EmptyState
          title="No tasks yet"
          message="Create your first task to get started."
        />
      )}

      {/* Week list */}
      {!isLoading && !error && weekGroups.length > 0 && (
        <div className="space-y-3">
          {weekGroups.map((group) => (
            <WeekCard
              key={group.weekKey}
              weekKey={group.weekKey}
              weekLabel={group.weekLabel}
              openCount={group.openCount}
              completedCount={group.completedCount}
              onClick={onWeekClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
