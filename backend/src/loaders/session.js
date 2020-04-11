const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const config = require('../config')
const logger = require('./logger')

module.exports = async (db) => {
  const store = new SequelizeStore({
    db,
    checkExpirationInterval: config.session.checkExpirationInterval,
    expiration: config.session.expiration,
  })

  await store.sync()
  logger.debug('Session database model synchronized successfully.')

  return session({
    secret: config.session.secret,
    resave: false,
    proxy: true,
    saveUninitialized: false,
    store,
  })
}
