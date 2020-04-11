const logger = require('./logger')
const sequelizeLoader = require('./sequelize')
const sessionLoader = require('./session')
const appsLoader = require('./apps')
const expressLoader = require('./express')

module.exports = async ({ expressApp }) => {
  const { models: appModels, routes: appRoutes } = appsLoader()

  const db = await sequelizeLoader(appModels)
  logger.info('Sequelize loaded.')

  const session = await sessionLoader(db)
  logger.info('Session middleware loaded.')

  await expressLoader(expressApp, session, appRoutes)
  logger.info('Express loaded.')
}
