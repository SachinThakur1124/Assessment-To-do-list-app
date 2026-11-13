import Header from './Header'

export default function AppLayout({ children, onAddTask }) {
  return (
    <div className="flex flex-col min-h-svh">
      <Header onAddTask={onAddTask} />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      <footer className="text-center text-xs text-text-tertiary py-4 border-t border-border">
        © {new Date().getFullYear()} Task Manager
      </footer>
    </div>
  )
}

