const { Router } = require('express')
const User = require('../../models/user')
const { requiresLogin } = require('../middlewares')

const route = Router()

route.get('/', requiresLogin, async (req, res, next) => {
  const { username, email, firstName, lastName, score } = req.session.user

  res.json({ username, email, firstName, lastName, score })
})

route.post('/', async (req, res, next) => {
  // Mock authentication if running in development mode.
  if (process.env.NODE_ENV === 'development') {
    let user = await User.findOne()
    if (!user) {
      const devUser = {
        username: 'admin',
        password: 'admin',
        email: 'admin@admin.com',
        firstName: 'Admin',
        lastName: 'Admin',
        targetGroup: true,
      }
      user = await User.create(devUser)
    }
    const {
      id,
      username,
      email,
      firstName,
      lastName,
      score,
      targetGroup,
    } = user

    req.session.user = {
      id,
      username,
      email,
      firstName,
      lastName,
      score,
      targetGroup,
    }

    return res.json({ username, email, firstName, lastName, score })
  }

  // // Attempt regular LDAP authentication if running in production.
  // const {
  //   body: { username: reqUsername, password: reqPassword },
  //   session,
  // } = req

  // if (!reqUsername || !reqPassword) {
  //   return next({
  //     message: 'Missing username or password.',
  //     status: HttpStatus.BAD_REQUEST,
  //   })
  // }

  // let user = null
  // try {
  //   user = await User.authenticate(reqUsername, reqPassword)
  // } catch ({ message, userExists }) {
  //   return next({
  //     message,
  //     status: userExists ? HttpStatus.UNAUTHORIZED : HttpStatus.NOT_FOUND,
  //   })
  // }

  // const { id, username, email, firstName, lastName, score } = user
  // session.user = {
  //   id,
  //   username,
  //   email,
  //   firstName,
  //   lastName,
  //   score,
  // }

  // res.json(session.user)
})

route.delete('/', requiresLogin, async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err)
    }

    res
      .clearCookie('connect.sid')
      .json({ message: 'You have been logged out.' })
  })
})

module.exports = route
