const express = require('express')
const HttpStatus = require('http-status-codes')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express')
const { OpenApiValidator } = require('express-openapi-validator')

const coreRoutes = require('../api')
const { requiresLogin } = require('../api/middlewares')
const apps = require('../apps')
const logger = require('./logger')

module.exports = async (app, session, appRoutes) => {
  // middlewares
  app.use(helmet()) // security
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common')) // logging
  app.use(cors({ origin: 'http://localhost:3000', credentials: true })) // use CORS
  app.use(express.json()) // parse request body as JSON
  app.use(session)

  // // OpenAPI
  // const apiSpec = YAML.load('src/api/docs/openapi.yml')
  // app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(apiSpec))

  // await new OpenApiValidator({
  //   apiSpec,
  //   validateRequests: true,
  //   validateResponses: true,
  // }).install(app)

  // status endpoint
  app.get('/ping', (req, res, next) => {
    res.json({ message: 'pong' })
  })

  // mount core routes on /api
  app.use('/api', coreRoutes)

  app.get('/api/apps', requiresLogin, (req, res) =>
    res.json({ data: Object.keys(apps) })
  )

  // mount app routes on /api/apps
  app.use('/api/apps', requiresLogin, appRoutes)

  // error handler
  app.use((err, req, res, next) => {
    if (err.status < 500 && err.message) {
      const { status, message } = err
      return res.status(status).json({ message })
    }

    logger.error(err.message)
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Something went wrong.' })
  })
}
