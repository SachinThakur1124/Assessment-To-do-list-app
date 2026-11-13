import { Inbox } from '../layout/icons'

/**
 * Reusable empty state component.
 * @param {string}  title   – main message
 * @param {string}  message – secondary description
 */
export default function EmptyState({
  title = 'No data found',
  message = '',
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-surface-hover dark:bg-slate-700/60 flex items-center justify-center mb-4">
        <Inbox className="w-6 h-6 text-text-tertiary dark:text-slate-400" />
      </div>
      <h3 className="text-base font-medium text-text-primary dark:text-white mb-1">{title}</h3>
      {message && (
        <p className="text-sm text-text-secondary dark:text-slate-400 max-w-xs">{message}</p>
      )}
    </div>
  )
}

