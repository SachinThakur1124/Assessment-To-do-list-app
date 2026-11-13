import { AlertCircle, Refresh } from '../layout/icons'

/**
 * Reusable error state with retry button.
 */
export default function ErrorState({
  title = 'Something went wrong',
  message = 'Could not communicate with the server. Please check your connection.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-danger-bg flex items-center justify-center mb-4 text-danger">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-5 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-primary-600 text-text-inverse hover:bg-primary-700 transition-colors cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500"
        >
          <Refresh className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  )
}

