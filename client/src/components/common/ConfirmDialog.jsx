import { Trash } from '../layout/icons'

/**
 * Reusable confirmation dialog for destructive actions with Dark Mode support.
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
        <div className="w-10 h-10 rounded-full bg-danger-bg dark:bg-red-950/60 flex items-center justify-center shrink-0">
          <Trash className="w-5 h-5 text-danger dark:text-red-400" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-text-primary dark:text-white mb-1">
            {title}
          </h4>
          <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border dark:border-slate-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-xs font-medium text-text-secondary dark:text-slate-300 hover:text-text-primary dark:hover:text-white hover:bg-surface-hover dark:hover:bg-slate-700 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500"
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
