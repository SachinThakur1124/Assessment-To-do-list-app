import mongoose from 'mongoose'

/**
 * 404 handler for unknown routes
 */
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  })
}

/**
 * Centralized error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message || 'Server error'

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400
    message = `Invalid ID format: ${err.value}`
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400
    const errors = Object.values(err.errors).map((el) => el.message)
    message = errors.join(', ')
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

