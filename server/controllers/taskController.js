import Task from '../models/Task.js'

/**
 * @desc   Get all tasks
 * @route  GET /api/tasks
 */
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ dateTime: -1 })
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc   Get single task by ID
 * @route  GET /api/tasks/:id
 */
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with id: ${req.params.id}`,
      })
    }
    res.status(200).json({
      success: true,
      data: task,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc   Create new task
 * @route  POST /api/tasks
 */
export const createTask = async (req, res, next) => {
  try {
    const { title, description, dateTime, startTime, endTime, priority, status } = req.body

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required',
      })
    }

    if (!dateTime) {
      return res.status(400).json({
        success: false,
        message: 'Task date and time are required',
      })
    }

    // Time order validation if both start and end times are supplied
    if (startTime && endTime && startTime > endTime) {
      return res.status(400).json({
        success: false,
        message: 'End time cannot be earlier than start time',
      })
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      dateTime,
      startTime: startTime || '',
      endTime: endTime || '',
      priority: priority || 'medium',
      status: status || 'in-progress',
    })

    res.status(201).json({
      success: true,
      data: task,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc   Update task
 * @route  PATCH /api/tasks/:id
 */
export const updateTask = async (req, res, next) => {
  try {
    const allowedUpdates = ['title', 'description', 'dateTime', 'startTime', 'endTime', 'priority', 'status']
    const updates = {}

    for (const key of Object.keys(req.body)) {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key]
      }
    }

    if (updates.title !== undefined) {
      if (typeof updates.title !== 'string' || !updates.title.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Title cannot be empty',
        })
      }
      updates.title = updates.title.trim()
    }

    if (updates.description !== undefined && typeof updates.description === 'string') {
      updates.description = updates.description.trim()
    }

    // Time validation if both are present in payload
    const finalStart = updates.startTime !== undefined ? updates.startTime : req.body.startTime
    const finalEnd = updates.endTime !== undefined ? updates.endTime : req.body.endTime
    if (finalStart && finalEnd && finalStart > finalEnd) {
      return res.status(400).json({
        success: false,
        message: 'End time cannot be earlier than start time',
      })
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        returnDocument: 'after',
        runValidators: true,
      }
    )

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with id: ${req.params.id}`,
      })
    }

    res.status(200).json({
      success: true,
      data: task,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc   Delete task
 * @route  DELETE /api/tasks/:id
 */
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with id: ${req.params.id}`,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: { id: req.params.id },
    })
  } catch (error) {
    next(error)
  }
}
