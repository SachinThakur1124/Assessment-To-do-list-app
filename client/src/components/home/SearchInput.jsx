import { Search } from '../layout/icons'

/**
 * Mobile Figma search input bar:
 * - White surface with rounded corners
 * - Soft border
 * - Search icon on the right
 */
export default function SearchInput({ value = '', onChange, onClick, readOnly = false, placeholder = 'Search Task' }) {
  return (
    <div
      onClick={onClick}
      className="relative w-full cursor-pointer"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        aria-label="Search tasks"
        className="w-full bg-white dark:bg-slate-800 border border-border/80 dark:border-slate-700 rounded-2xl py-3 pl-4 pr-11 text-xs sm:text-sm text-text-primary dark:text-white placeholder:text-text-tertiary dark:placeholder:text-slate-400 shadow-xs focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all cursor-pointer"
      />
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-text-tertiary">
        <Search className="w-4 h-4 text-primary-600" />
      </div>
    </div>
  )
}

