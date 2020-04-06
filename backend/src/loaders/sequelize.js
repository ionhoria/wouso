const Sequelize = require('sequelize')

const config = require('../config')
const logger = require('../logger')
const models = require('../models')

module.exports = async () => {
  const db = new Sequelize(
    config.database.name,
    config.database.username,
    config.database.password,
    {
      host: config.database.host || 'localhost',
      port: config.database.port || 3306,
      dialect: config.database.dialect || 'mysql',
      logging: config.database.logging ? (msg) => logger.debug(msg) : false,
      logQueryParameters: true,
      raw: true,
    }
  )

  // test database connection
  await db.authenticate().catch((err) => {
    logger.error(`${err.name}: ${err.message}`)
    process.exit(1)
  })
  logger.debug('Database connection established.')

  // load database models
  Object.values(models).forEach((model) => {
    model.init(db)
    logger.debug(`Loaded ${model.name} model.`)
  })
  logger.debug('Database models loaded.')

  // load model associations
  Object.values(models)
    .filter((model) => typeof model.associate === 'function')
    .forEach((model) => {
      model.associate(models)
      logger.debug(`Loaded ${model.name} associations.`)
    })
  logger.debug('Database associations loaded.')

  await db.sync({ force: true }).catch((err) => {
    logger.error(`${err.name}: ${err.message}`)
    process.exit(1)
  })
  logger.debug('Database synchronized successfully.')

  return db
}
