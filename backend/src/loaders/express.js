const express = require('express')
const HttpStatus = require('http-status-codes')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('../api')
const { ServerError } = require('../api/errors')
const logger = require('../logger')

module.exports = (app, session) => {
  // middlewares
  app.use(helmet()) // security
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common')) // logging
  app.use(cors()) // use CORS
  app.use(express.json()) // parse request body as JSON

  // app.use(session)

  app.use((req, res, next) => {
    res._json = res.json
    res.json = (data) => res._json({ data })
    res.message = (message) => res._json({ message })
    next()
  })

  // status endpoint
  app.get('/ping', (req, res, next) => {
    res.message('pong')
  })

  // mount routes on /api
  app.use('/api', routes())

  // 404 catch all
  app.use((req, res, next) => {
    next(
      new ServerError(HttpStatus.NOT_FOUND, `Cannot ${req.method} ${req.url}`)
    )
  })

  // error handler
  app.use((err, req, res, next) => {
    if (err instanceof ServerError) {
      const { status, message } = err
      return res.status(status).message(message)
    }

    logger.error(err.stack)
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .message('Something went wrong.')
  })
}
