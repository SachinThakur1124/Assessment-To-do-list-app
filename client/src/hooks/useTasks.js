import { useCallback, useEffect, useMemo, useState } from 'react'

import { taskApi } from '../services/taskApi'
import { groupTasksByWeek } from '../utils/taskUtils'

/**
 * Custom hook that manages server-backed task state.
 *
 * Public API matches the Phase 2-6 contract so all UI components remain stable:
 *   - tasks
 *   - weekGroups
 *   - isLoading
 *   - error
 *   - refetch
 *   - createTask
 *   - updateTask
 *   - deleteTask
 *   - toggleStatus
 *   - getTaskById
 *   - getWeekGroup
 */
export default function useTasks() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // ─── Initial Load from Server ───────────────────────────
  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await taskApi.getTasks()
      setTasks(data)
    } catch (err) {
      setError(err.message || 'Failed to connect to task server')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // ─── Derived Week Groups ────────────────────────────────
  const weekGroups = useMemo(
    () => groupTasksByWeek(tasks),
    [tasks],
  )

  // ─── CRUD Operations ────────────────────────────────────

  const createTask = useCallback(async (taskData) => {
    try {
      const created = await taskApi.createTask(taskData)
      setTasks((prev) => [created, ...prev])
      return created
    } catch (err) {
      setError(err.message || 'Failed to create task')
      throw err
    }
  }, [])

  const updateTask = useCallback(async (id, updates) => {
    try {
      const updated = await taskApi.updateTask(id, updates)
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      )
      return updated
    } catch (err) {
      setError(err.message || 'Failed to update task')
      throw err
    }
  }, [])

  const deleteTask = useCallback(async (id) => {
    try {
      await taskApi.deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError(err.message || 'Failed to delete task')
      throw err
    }
  }, [])

  const toggleStatus = useCallback(async (id) => {
    const currentTask = tasks.find((t) => t.id === id)
    if (!currentTask) return

    const newStatus = currentTask.status === 'completed' ? 'in-progress' : 'completed'

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    )

    try {
      const updated = await taskApi.updateTask(id, { status: newStatus })
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      )
    } catch (err) {
      // Rollback on failure
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? currentTask : t))
      )
      setError(err.message || 'Failed to toggle status')
    }
  }, [tasks])

  // ─── Lookup Helpers ─────────────────────────────────────

  const getTaskById = useCallback(
    (id) => tasks.find((t) => t.id === id),
    [tasks],
  )

  const getWeekGroup = useCallback(
    (weekKey) => weekGroups.find((g) => g.weekKey === weekKey) || null,
    [weekGroups],
  )

  return {
    tasks,
    weekGroups,
    isLoading,
    error,
    refetch: fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleStatus,
    getTaskById,
    getWeekGroup,
  }
}
