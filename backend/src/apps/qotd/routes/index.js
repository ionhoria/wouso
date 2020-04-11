const { Router } = require('express')
const { Qotd } = require('../models')

const route = Router()
route.get('/', async (req, res, next) => {
  await Qotd.create({ text: 'something' })
  res.json('Hello')
})

module.exports = route
