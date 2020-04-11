const { Router } = require('express')
const session = require('./routes/session')

const app = Router()

app.use('/session', session)

module.exports = app
