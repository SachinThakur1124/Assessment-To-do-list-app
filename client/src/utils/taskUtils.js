/**
 * Pure task utility functions.
 * No React, no side-effects — just data transformations.
 */

import { getWeekKey, formatWeekRange } from './dateUtils'

// ─── Grouping ───────────────────────────────────────────────

/**
 * Group an array of tasks by their ISO week (Mon–Sun).
 *
 * Returns an array sorted most-recent-first:
 *   [{ weekKey, weekLabel, tasks, openCount, completedCount }, …]
 *
 * @param {Array} tasks
 * @returns {Array}
 */
export function groupTasksByWeek(tasks) {
  const map = new Map()

  for (const task of tasks) {
    const key = getWeekKey(task.dateTime)

    if (!map.has(key)) {
      map.set(key, {
        weekKey: key,
        weekLabel: formatWeekRange(key),
        tasks: [],
      })
    }
    map.get(key).tasks.push(task)
  }

  // Sort weeks descending (newest first) by weekKey (YYYY-MM-DD string)
  const groups = Array.from(map.values()).sort((a, b) =>
    b.weekKey.localeCompare(a.weekKey),
  )

  // Attach counts
  for (const group of groups) {
    group.openCount = countOpen(group.tasks)
    group.completedCount = countCompleted(group.tasks)
  }

  return groups
}

// ─── Counts ─────────────────────────────────────────────────

/**
 * Count tasks that are NOT completed (i.e. "in-progress").
 * @param {Array} tasks
 * @returns {number}
 */
export function countOpen(tasks) {
  return tasks.filter((t) => t.status !== 'completed').length
}

/**
 * Count tasks that are completed.
 * @param {Array} tasks
 * @returns {number}
 */
export function countCompleted(tasks) {
  return tasks.filter((t) => t.status === 'completed').length
}

// ─── Search / Filter ────────────────────────────────────────

/**
 * Filter tasks whose title or description includes the query (case-insensitive).
 * Returns all tasks when query is empty/blank.
 *
 * @param {Array}  tasks
 * @param {string} query
 * @returns {Array}
 */
export function searchTasks(tasks, query) {
  const q = (query || '').trim().toLowerCase()
  if (!q) return tasks

  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q),
  )
}

