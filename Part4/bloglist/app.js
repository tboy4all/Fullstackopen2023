// const path = require('path')
const express = require('express')
const config = require('./utils/config')
const morgan = require('morgan')
const cors = require('cors')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const blogRouter = require('./routes/blogRoutes')

// Start express app
const app = express()

mongoose.set('strictQuery', false)

logger.info('connecting to', config.DB)

mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
  })
  .then(() => logger.info('DB connection successful'))
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// GLOBAL MIDDLEWARES
// Implement CORS

app.use(cors())
app.options('*', cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

morgan.token('data', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : ' '
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

// ROUTES
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// START SERVER
module.exports = app
