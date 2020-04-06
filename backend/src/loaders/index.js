const logger = require('../logger')
const sequelizeLoader = require('./sequelize')
const sessionLoader = require('./session')
const expressLoader = require('./express')

module.exports = async ({ expressApp }) => {
  const db = await sequelizeLoader()
  logger.info('Sequelize loaded.')
  const session = await sessionLoader(db)
  await expressLoader(expressApp)
  logger.info('Express loaded.')
}
