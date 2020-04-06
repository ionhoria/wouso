const winston = require('winston')
const config = require('../config')

const { combine, prettyPrint, colorize, simple, splat } = winston.format

module.exports = winston.createLogger({
  level: (config.winston && config.winston.level) || 'silly',
  transports: [new winston.transports.Console()],
  format: combine(colorize(), splat(), prettyPrint(), simple()),
})
