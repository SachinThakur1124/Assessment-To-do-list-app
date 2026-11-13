/**
 * Small colored badge indicating task priority.
 * Displays the complete priority name (High, Medium, Low) cleanly without truncation.
 */

const PRIORITY_STYLES = {
  high: 'bg-red-50 text-red-600 border border-red-200/70',
  medium: 'bg-amber-50 text-amber-700 border border-amber-200/70',
  low: 'bg-blue-50 text-blue-600 border border-blue-200/70',
}

const PRIORITY_LABELS = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

export default function PriorityBadge({ priority = 'medium' }) {
  const normalized = (priority || 'medium').toLowerCase()

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold leading-none select-none shrink-0 ${
        PRIORITY_STYLES[normalized] || PRIORITY_STYLES.medium
      }`}
    >
      {PRIORITY_LABELS[normalized] || 'Medium'}
    </span>
  )
}
