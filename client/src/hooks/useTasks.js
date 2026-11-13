import { useCallback, useEffect, useMemo, useState } from 'react'

import mockTasks from '../data/mockTasks'
import { taskApi } from '../services/taskApi'
import { groupTasksByWeek } from '../utils/taskUtils'

/**
 * Custom hook that manages server-backed task state with graceful offline/preview fallback.
 *
 * Public API matches the contract so all UI components remain stable:
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

  // ─── Initial Load from Server (with local fallback for Netlify preview) ─
  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await taskApi.getTasks()
      setTasks(data)
      try {
        localStorage.setItem('cached_tasks', JSON.stringify(data))
      } catch {}
    } catch {
      // Graceful preview/offline fallback when backend is unreachable on Netlify
      const cached = localStorage.getItem('cached_tasks')
      if (cached) {
        try {
          setTasks(JSON.parse(cached))
          setIsLoading(false)
          return
        } catch {}
      }
      setTasks(mockTasks)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Helper to persist local cache
  const persistCache = (updatedList) => {
    try {
      localStorage.setItem('cached_tasks', JSON.stringify(updatedList))
    } catch {}
  }

  // ─── Derived Week Groups ────────────────────────────────
  const weekGroups = useMemo(
    () => groupTasksByWeek(tasks),
    [tasks],
  )

  // ─── CRUD Operations ────────────────────────────────────

  const createTask = useCallback(async (taskData) => {
    try {
      const created = await taskApi.createTask(taskData)
      setTasks((prev) => {
        const next = [created, ...prev]
        persistCache(next)
        return next
      })
      return created
    } catch {
      // Offline fallback: generate local task
      const fallbackTask = {
        id: `local-${Date.now()}`,
        title: taskData.title,
        description: taskData.description || '',
        dateTime: taskData.dateTime || new Date().toISOString().slice(0, 16),
        startTime: taskData.startTime || '09:00',
        endTime: taskData.endTime || '',
        priority: taskData.priority || 'medium',
        status: 'in-progress',
      }
      setTasks((prev) => {
        const next = [fallbackTask, ...prev]
        persistCache(next)
        return next
      })
      return fallbackTask
    }
  }, [])

  const updateTask = useCallback(async (id, updates) => {
    try {
      const updated = await taskApi.updateTask(id, updates)
      setTasks((prev) => {
        const next = prev.map((t) => (t.id === id ? updated : t))
        persistCache(next)
        return next
      })
      return updated
    } catch {
      setTasks((prev) => {
        const next = prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
        persistCache(next)
        return next
      })
    }
  }, [])

  const deleteTask = useCallback(async (id) => {
    try {
      await taskApi.deleteTask(id)
      setTasks((prev) => {
        const next = prev.filter((t) => t.id !== id)
        persistCache(next)
        return next
      })
    } catch {
      setTasks((prev) => {
        const next = prev.filter((t) => t.id !== id)
        persistCache(next)
        return next
      })
    }
  }, [])

  const toggleStatus = useCallback(async (id) => {
    const currentTask = tasks.find((t) => t.id === id)
    if (!currentTask) return

    const newStatus = currentTask.status === 'completed' ? 'in-progress' : 'completed'

    // Optimistic UI update
    setTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
      persistCache(next)
      return next
    })

    try {
      await taskApi.updateTask(id, { status: newStatus })
    } catch {
      // Local state is already updated optimistically and persisted in cache
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
