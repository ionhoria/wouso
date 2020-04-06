const { Router } = require('express')
const users = require('./routes/users')

module.exports = () => {
  const app = Router()

  app.use('/users', users)

  return app
}
