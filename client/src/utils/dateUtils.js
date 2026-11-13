/**
 * Pure date utility functions.
 * All week boundaries use Monday = start, Sunday = end (ISO week).
 * Every function works with plain strings or Date objects — no
 * external library required.
 */

// ─── Week Boundaries ────────────────────────────────────────

/**
 * Return the Monday 00:00:00 of the week containing `date`.
 * @param {Date|string} date
 * @returns {Date}
 */
export function getWeekStart(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Return the Sunday 23:59:59.999 of the week containing `date`.
 * @param {Date|string} date
 * @returns {Date}
 */
export function getWeekEnd(date) {
  const start = getWeekStart(date)
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

// ─── Week Key ───────────────────────────────────────────────

/**
 * Generate a stable, sortable string key for the week containing `date`.
 * Format: "YYYY-MM-DD" of the Monday.
 * @param {Date|string} date
 * @returns {string}
 */
export function getWeekKey(date) {
  return formatISO(getWeekStart(date))
}

// ─── Formatting ─────────────────────────────────────────────

/**
 * Format a Date as "YYYY-MM-DD".
 * @param {Date} date
 * @returns {string}
 */
export function formatISO(date) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/**
 * Human-readable range for a week: "Nov 11 – Nov 17, 2026".
 * @param {Date|string} weekStartDate – the Monday of the week
 * @returns {string}
 */
export function formatWeekRange(weekStartDate) {
  const start = new Date(weekStartDate)
  const end = new Date(start)
  end.setDate(end.getDate() + 6)

  const monthShort = (d) =>
    d.toLocaleString('en-US', { month: 'short' })
  const day = (d) => d.getDate()
  const year = (d) => d.getFullYear()

  if (start.getMonth() === end.getMonth()) {
    return `${monthShort(start)} ${day(start)} – ${day(end)}, ${year(end)}`
  }
  return `${monthShort(start)} ${day(start)} – ${monthShort(end)} ${day(end)}, ${year(end)}`
}

/**
 * Format a dateTime string for display: "Nov 13, 2026 · 2:30 PM"
 * @param {string} dateTime – ISO-ish "YYYY-MM-DDTHH:MM"
 * @returns {string}
 */
export function formatDateTime(dateTime) {
  const d = new Date(dateTime)
  const date = d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const time = d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return `${date} · ${time}`
}

// ─── Checks ─────────────────────────────────────────────────

/**
 * Does `weekKey` (a Monday "YYYY-MM-DD") represent the current week?
 * @param {string} weekKey
 * @returns {boolean}
 */
export function isCurrentWeek(weekKey) {
  return weekKey === getWeekKey(new Date())
}

/**
 * Returns an array of the 7 days (Mon-Sun) for the week containing `referenceDate`.
 * Each item has: { dayName: 'M', dateNum: 13, isoDate: '2026-11-13', fullDate: Date }
 * @param {Date|string} referenceDate
 * @returns {Array}
 */
export function getDaysForWeek(referenceDate = new Date()) {
  const monday = getWeekStart(referenceDate)
  const dayInitials = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return Array.from({ length: 7 }, (_, i) => {
    const current = new Date(monday)
    current.setDate(monday.getDate() + i)
    return {
      dayName: dayInitials[i],
      dateNum: current.getDate(),
      isoDate: formatISO(current),
      fullDate: current,
    }
  })
}
