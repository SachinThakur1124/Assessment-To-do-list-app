import { useMemo, useState } from 'react'

import ConfirmDialog from './components/common/ConfirmDialog'
import Modal from './components/common/Modal'
import OnboardingScreen from './components/onboarding/OnboardingScreen'
import TaskForm from './components/task/TaskForm'
import useTasks from './hooks/useTasks'
import FigmaHomeScreen from './pages/FigmaHomeScreen'
import SearchScreen from './pages/SearchScreen'
import { formatISO, getDaysForWeek, getWeekKey } from './utils/dateUtils'

function App() {
  const taskState = useTasks()

  // Onboarding screen state (uses "hasCompletedOnboarding" key)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('hasCompletedOnboarding') === 'true'
  })

  // Selected date ISO string: defaults to today ("YYYY-MM-DD")
  const [selectedDate, setSelectedDate] = useState(() => formatISO(new Date()))

  // Navigation: Home vs Dedicated Search Screen
  const [isSearchActive, setIsSearchActive] = useState(false)

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [taskToDelete, setTaskToDelete] = useState(null)

  const handleFinishOnboarding = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true')
    setHasCompletedOnboarding(true)
  }

  // Open form in Create mode
  const handleOpenCreate = () => {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  // Open form in Edit mode
  const handleOpenEdit = (task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  // Close form & reset
  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingTask(null)
  }

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      if (editingTask) {
        await taskState.updateTask(editingTask.id, formData)
      } else {
        await taskState.createTask(formData)
      }
      handleCloseForm()
    } catch {
      // Error handled in state
    }
  }

  // Delete task triggers confirmation
  const handleOpenDelete = (task) => {
    setTaskToDelete(task)
  }

  const handleCloseDelete = () => {
    setTaskToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      try {
        await taskState.deleteTask(taskToDelete.id)
        handleCloseDelete()
      } catch {
        // Error captured in state
      }
    }
  }

  // ─── Selected Week & Days Calculation ───────────────────
  const selectedWeekDays = useMemo(() => {
    return getDaysForWeek(selectedDate)
  }, [selectedDate])

  const selectedWeekKey = useMemo(() => {
    return getWeekKey(selectedDate)
  }, [selectedDate])

  // Get all tasks belonging to the selected week (for progress & summary cards)
  const selectedWeekGroup = useMemo(() => {
    return taskState.getWeekGroup(selectedWeekKey)
  }, [taskState, selectedWeekKey])

  const completedCount = selectedWeekGroup?.completedCount || 0
  const pendingCount = selectedWeekGroup?.openCount || 0

  // Filter tasks specifically for the selected date on the Home Screen
  const tasksForSelectedDate = useMemo(() => {
    return taskState.tasks.filter((t) => {
      if (!t.dateTime) return false
      return t.dateTime.startsWith(selectedDate)
    })
  }, [taskState.tasks, selectedDate])

  // 1. First-time visit: Render Onboarding Screen
  if (!hasCompletedOnboarding) {
    return <OnboardingScreen onGetStarted={handleFinishOnboarding} />
  }

  // 2. Normal App Flow: Home or Search Screen
  return (
    <>
      {isSearchActive ? (
        <SearchScreen
          tasks={taskState.tasks}
          onBack={() => setIsSearchActive(false)}
          onToggleStatus={taskState.toggleStatus}
          onEditTask={handleOpenEdit}
          onDeleteTask={handleOpenDelete}
        />
      ) : (
        <FigmaHomeScreen
          tasks={tasksForSelectedDate}
          completedCount={completedCount}
          pendingCount={pendingCount}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          weekDays={selectedWeekDays}
          isLoading={taskState.isLoading}
          error={taskState.error}
          onRetry={taskState.refetch}
          onOpenCreate={handleOpenCreate}
          onOpenSearch={() => setIsSearchActive(true)}
          onToggleStatus={taskState.toggleStatus}
          onEditTask={handleOpenEdit}
          onDeleteTask={handleOpenDelete}
          onViewAll={() => setIsSearchActive(true)}
        />
      )}

      {/* Reusable Create / Edit Task Modal matching Figma */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        <TaskForm
          initialData={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseForm}
          submitLabel={editingTask ? 'Update task' : 'Create task'}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!taskToDelete}
        onClose={handleCloseDelete}
        title="Delete Task"
      >
        <ConfirmDialog
          title="Delete this task?"
          message={`Are you sure you want to delete "${taskToDelete?.title || 'this task'}"?`}
          confirmLabel="Delete"
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDelete}
        />
      </Modal>
    </>
  )
}

export default App
