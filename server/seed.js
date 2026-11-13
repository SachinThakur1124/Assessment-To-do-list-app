import 'dotenv/config'
import mongoose from 'mongoose'
import Task from './models/Task.js'

const sampleTasks = [
  // Current Week (Nov 9 - 15, 2026)
  {
    title: 'Set up project repository',
    description: 'Initialize Git repo, add README, and configure branch protection rules.',
    dateTime: new Date('2026-11-13T09:00:00'),
    priority: 'high',
    status: 'completed',
  },
  {
    title: 'Design database schema',
    description: 'Define Mongoose models for tasks including validations and indexes.',
    dateTime: new Date('2026-11-13T14:30:00'),
    priority: 'high',
    status: 'in-progress',
  },
  {
    title: 'Create API endpoints',
    description: 'Build RESTful CRUD routes for the task resource using Express.',
    dateTime: new Date('2026-11-14T10:00:00'),
    priority: 'medium',
    status: 'in-progress',
  },
  {
    title: 'Write unit tests for utilities',
    description: 'Add test coverage for date and task utility functions.',
    dateTime: new Date('2026-11-15T11:00:00'),
    priority: 'low',
    status: 'in-progress',
  },

  // Last Week (Nov 2 - 8, 2026)
  {
    title: 'Research tech stack options',
    description: 'Compare MERN vs Next.js and document trade-offs for the team.',
    dateTime: new Date('2026-11-06T09:00:00'),
    priority: 'medium',
    status: 'completed',
  },
  {
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for lint, test, and deploy on push to main.',
    dateTime: new Date('2026-11-07T13:00:00'),
    priority: 'high',
    status: 'completed',
  },
  {
    title: 'Draft wireframes',
    description: 'Sketch low-fidelity wireframes for the task manager dashboard.',
    dateTime: new Date('2026-11-08T15:30:00'),
    priority: 'medium',
    status: 'in-progress',
  },

  // Next Week (Nov 16 - 22, 2026)
  {
    title: 'Integrate frontend with API',
    description: 'Replace mock data with live API calls using fetch and async/await.',
    dateTime: new Date('2026-11-20T10:00:00'),
    priority: 'high',
    status: 'in-progress',
  },
  {
    title: 'Add form validation',
    description: 'Implement client-side validation for the task create/edit form.',
    dateTime: new Date('2026-11-21T14:00:00'),
    priority: 'medium',
    status: 'in-progress',
  },
]

async function seed() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskmanager'
    await mongoose.connect(uri)
    console.log('[Seed] Connected to database')

    await Task.deleteMany({})
    console.log('[Seed] Cleared existing tasks')

    const inserted = await Task.insertMany(sampleTasks)
    console.log(`[Seed] Successfully inserted ${inserted.length} sample tasks!`)

    process.exit(0)
  } catch (err) {
    console.error('[Seed] Error:', err.message)
    process.exit(1)
  }
}

seed()

