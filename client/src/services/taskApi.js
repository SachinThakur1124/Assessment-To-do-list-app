/**
 * Client-side API service for tasks.
 * Normalizes backend responses from MongoDB (_id / ISO strings)
 * to match the frontend task contract:
 *   { id, title, description, dateTime, startTime, endTime, priority, status }
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * Normalizes a task entity from the API:
 * - Ensures `id` is a string (from `_id` or `id`)
 * - Ensures `dateTime` is formatted as "YYYY-MM-DDTHH:MM"
 * - Extracts or preserves `startTime` and `endTime`
 */
export function normalizeTask(task) {
  if (!task) return null

  let dateTime = task.dateTime
  let extractedTime = ''

  if (dateTime) {
    const d = new Date(dateTime)
    if (!isNaN(d.getTime())) {
      const pad = (n) => String(n).padStart(2, '0')
      dateTime = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
      extractedTime = `${pad(d.getHours())}:${pad(d.getMinutes())}`
    }
  }

  // Gracefully fallback: if startTime not explicitly stored, derive from dateTime
  const startTime = task.startTime || extractedTime || '09:00'
  const endTime = task.endTime || ''

  return {
    id: String(task.id || task._id),
    title: task.title || '',
    description: task.description || '',
    dateTime: dateTime || '',
    startTime,
    endTime,
    priority: task.priority || 'medium',
    status: task.status || 'in-progress',
  }
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const response = await fetch(url, { ...options, headers })
  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    const errorMessage = result?.message || `Request failed with status ${response.status}`
    const error = new Error(errorMessage)
    error.status = response.status
    error.data = result
    throw error
  }

  return result
}

export const taskApi = {
  async getTasks() {
    const res = await request('/tasks')
    const list = res.data || []
    return list.map(normalizeTask)
  },

  async createTask(taskData) {
    const res = await request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    })
    return normalizeTask(res.data)
  },

  async updateTask(id, updates) {
    const res = await request(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
    return normalizeTask(res.data)
  },

  async deleteTask(id) {
    await request(`/tasks/${id}`, {
      method: 'DELETE',
    })
    return id
  },
}
