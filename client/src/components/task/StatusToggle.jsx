/**
 * Toggle button to switch a task between In Progress and Completed.
 * Purely presentational — receives current status and fires onChange.
 */

import { CheckCircle, Clock } from '../layout/icons'

export default function StatusToggle({ status, onChange }) {
  const isCompleted = status === 'completed'

  return (
    <button
      type="button"
      onClick={onChange}
      title={isCompleted ? 'Mark as In Progress' : 'Mark as Completed'}
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium
        transition-colors cursor-pointer
        focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500
        ${
          isCompleted
            ? 'bg-status-completed-bg text-status-completed hover:bg-green-100'
            : 'bg-status-progress-bg text-status-progress hover:bg-blue-100'
        }
      `}
    >
      {isCompleted ? (
        <>
          <CheckCircle className="w-3.5 h-3.5" />
          Completed
        </>
      ) : (
        <>
          <Clock className="w-3.5 h-3.5" />
          In Progress
        </>
      )}
    </button>
  )
}

