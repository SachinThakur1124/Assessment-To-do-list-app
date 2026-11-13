import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './db/connect.js'
import taskRoutes from './routes/taskRoutes.js'
import { notFound, errorHandler } from './middlewares/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middlewares
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  })
)
app.use(express.json())

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() })
})

// API routes
app.use('/api/tasks', taskRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`[Server] running on port ${PORT}`)
})

export default app

