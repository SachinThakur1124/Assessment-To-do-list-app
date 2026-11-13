/**
 * Realistic mock tasks spanning multiple weeks around the current date.
 * Dates are deliberately spread Mon–Sun across 4+ weeks to make
 * week-grouping easy to verify.
 *
 * Shape:
 *   { id, title, description, dateTime, priority, status }
 */

// Helper — returns "YYYY-MM-DDTHH:MM" for a date offset by `daysDelta` from today
function buildDate(daysDelta, hours = 10, minutes = 0) {
  const d = new Date()
  d.setDate(d.getDate() + daysDelta)
  d.setHours(hours, minutes, 0, 0)

  const pad = (n) => String(n).padStart(2, '0')
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}`
  )
}

// Unique id counter (replaced by backend _id once API is connected)
let _nextId = 1
function uid() {
  return `mock-${_nextId++}`
}

const mockTasks = [
  // ───── This week ─────
  {
    id: uid(),
    title: 'Set up project repository',
    description: 'Initialize Git repo, add README, and configure branch protection rules.',
    dateTime: buildDate(0, 9, 0),        // today 09:00
    priority: 'high',
    status: 'completed',
  },
  {
    id: uid(),
    title: 'Design database schema',
    description: 'Define Mongoose models for tasks including validations and indexes.',
    dateTime: buildDate(0, 14, 30),      // today 14:30
    priority: 'high',
    status: 'in-progress',
  },
  {
    id: uid(),
    title: 'Create API endpoints',
    description: 'Build RESTful CRUD routes for the task resource using Express.',
    dateTime: buildDate(1, 10, 0),       // tomorrow 10:00
    priority: 'medium',
    status: 'in-progress',
  },
  {
    id: uid(),
    title: 'Write unit tests for utilities',
    description: 'Add test coverage for date and task utility functions.',
    dateTime: buildDate(2, 11, 0),
    priority: 'low',
    status: 'in-progress',
  },

  // ───── Last week ─────
  {
    id: uid(),
    title: 'Research tech stack options',
    description: 'Compare MERN vs Next.js and document trade-offs for the team.',
    dateTime: buildDate(-7, 9, 0),
    priority: 'medium',
    status: 'completed',
  },
  {
    id: uid(),
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for lint, test, and deploy on push to main.',
    dateTime: buildDate(-6, 13, 0),
    priority: 'high',
    status: 'completed',
  },
  {
    id: uid(),
    title: 'Draft wireframes',
    description: 'Sketch low-fidelity wireframes for the task manager dashboard.',
    dateTime: buildDate(-5, 15, 30),
    priority: 'medium',
    status: 'in-progress',
  },

  // ───── Two weeks ago ─────
  {
    id: uid(),
    title: 'Kick-off meeting',
    description: 'Align with stakeholders on scope, timeline, and deliverables.',
    dateTime: buildDate(-14, 10, 0),
    priority: 'high',
    status: 'completed',
  },
  {
    id: uid(),
    title: 'Gather requirements',
    description: 'Document functional and non-functional requirements from the brief.',
    dateTime: buildDate(-13, 11, 0),
    priority: 'medium',
    status: 'completed',
  },

  // ───── Next week ─────
  {
    id: uid(),
    title: 'Integrate frontend with API',
    description: 'Replace mock data with live API calls using fetch and async/await.',
    dateTime: buildDate(7, 10, 0),
    priority: 'high',
    status: 'in-progress',
  },
  {
    id: uid(),
    title: 'Add form validation',
    description: 'Implement client-side validation for the task create/edit form.',
    dateTime: buildDate(8, 14, 0),
    priority: 'medium',
    status: 'in-progress',
  },
  {
    id: uid(),
    title: 'Review pull request',
    description: 'Code-review the task CRUD PR and leave actionable feedback.',
    dateTime: buildDate(9, 16, 0),
    priority: 'low',
    status: 'in-progress',
  },
]

export default mockTasks

