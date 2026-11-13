import { Trash } from '../layout/icons'

/**
 * Reusable confirmation dialog for destructive actions (e.g. deleting a task).
 *
 * Props:
 *   title - modal title (e.g. "Delete Task?")
 *   message - description text
 *   confirmLabel - button text for confirming (defaults to 'Delete')
 *   onConfirm - callback when destructive action is clicked
 *   onCancel - callback when cancelled
 */
export default function ConfirmDialog({
  title = 'Delete Task?',
  message = 'Are you sure you want to delete this task? This action cannot be undone.',
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-danger-bg flex items-center justify-center shrink-0">
          <Trash className="w-5 h-5 text-danger" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-1">
            {title}
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-4 py-2 rounded-xl text-xs font-medium bg-danger text-text-inverse hover:bg-red-600 shadow-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-danger"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  )
}

