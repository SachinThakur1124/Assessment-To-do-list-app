import { Search, XMark } from '../layout/icons'

/**
 * Reusable search bar component.
 * Props:
 *   value - current query string
 *   onChange - callback(newQuery)
 *   placeholder - input placeholder text
 */
export default function SearchBar({
  value = '',
  onChange,
  placeholder = 'Search tasks by title or description...',
}) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-tertiary">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        aria-label="Search tasks"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 text-sm bg-surface border border-border rounded-xl
                   text-text-primary placeholder:text-text-tertiary shadow-sm
                   focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus
                   transition-all"
      />

      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange?.('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-tertiary
                     hover:text-text-primary transition-colors cursor-pointer"
        >
          <XMark className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

