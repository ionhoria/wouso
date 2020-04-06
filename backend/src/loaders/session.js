const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const config = require('../config')

module.exports = (db) =>
  session({
    secret: config.session.secret,
    resave: false,
    proxy: true,
    saveUninitialized: false,
    store: new SequelizeStore({
      db,
      checkExpirationInterval: config.session.checkExpirationInterval,
      expiration: config.session.expiration,
    }),
  })
