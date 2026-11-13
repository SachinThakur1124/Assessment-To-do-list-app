import { Moon, Sun } from '../layout/icons'

/**
 * Accessible Dark / Light Mode Toggle button:
 * - Shows Moon icon when in Light Mode
 * - Shows Sun icon when in Dark Mode
 * - Easily placed into headers or top bars
 */
export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-border/80 dark:border-slate-700 flex items-center justify-center text-text-secondary dark:text-slate-300 hover:text-text-primary dark:hover:text-white shadow-xs transition-colors cursor-pointer"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  )
}

