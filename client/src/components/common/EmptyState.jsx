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
      <div className="w-12 h-12 rounded-full bg-surface-hover flex items-center justify-center mb-4">
        <Inbox className="w-6 h-6 text-text-tertiary" />
      </div>
      <h3 className="text-base font-medium text-text-primary mb-1">{title}</h3>
      {message && (
        <p className="text-sm text-text-secondary max-w-xs">{message}</p>
      )}
    </div>
  )
}

