const result = require('dotenv').config()

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  express: {
    port: parseInt(process.env.EXPRESS_PORT),
    host: process.env.EXPRESS_HOST,
  },
  database: {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    name: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    logging: process.env.MYSQL_LOGGING === 'true',
  },
  session: {
    secret: process.env.SESSION_SECRET,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 7 * 24 * 60 * 60 * 1000,
  },
}
