const Sequelize = require('sequelize')

const config = require('../config')
const logger = require('./logger')
const coreModels = require('../models')

const initAndAssociate = (db, models) => {
  // load models
  Object.values(models).forEach((model) => {
    model.init(db)
    logger.debug(`Loaded ${model.name} model.`)
  })

  // load model associations
  Object.values(models)
    .filter((model) => typeof model.associate === 'function')
    .forEach((model) => {
      model.associate(models)
      logger.debug(`Loaded ${model.name} associations.`)
    })
}

module.exports = async (appModels) => {
  const db = new Sequelize(
    config.database.name,
    config.database.username,
    config.database.password,
    {
      host: config.database.host,
      port: config.database.port,
      dialect: config.database.dialect,
      logging: config.database.logging ? (msg) => logger.debug(msg) : false,
      logQueryParameters: true,
      define: {
        // prevent sequelize from pluralizing table names
        freezeTableName: true,
      },
    }
  )

  // test database connection
  await db.authenticate().catch((err) => {
    logger.error(`${err.name}: ${err.message}`)
    process.exit(1)
  })
  logger.debug('Database connection established.')

  initAndAssociate(db, { ...coreModels, ...appModels })
  logger.debug('Models loaded.')

  // initAndAssociate(db, appModels)
  // logger.debug('App models loaded.')

  await db.sync().catch((err) => {
    logger.error(`${err.name}: ${err.message}`)
    process.exit(1)
  })
  logger.debug('Database synchronized successfully.')

  return db
}
