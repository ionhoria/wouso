const http = require('http')
const express = require('express')
const { createTerminus } = require('@godaddy/terminus')

const config = require('./config')
const loaders = require('./loaders')
const logger = require('./loaders/logger')

async function startServer() {
  const app = express()

  await loaders({ expressApp: app })

  const server = http.createServer(app)

  // intercept termination signals and attempt graceful shutdown
  createTerminus(server, {
    signals: ['SIGTERM', 'SIGINT'],
    onSignal: () => logger.info('Server gracefully shutting down...'),
    onShutdown: () => logger.info('Server shutdown complete.'),
    logger: logger.error,
  })

  server.listen(config.express.port, config.express.host, () =>
    logger.info(
      `Server listening on ${config.express.host}:${config.express.port}.`
    )
  )
}

startServer()
