const authenticationRouter = require('express').Router()
const HttpStatus = require('http-status-codes')
const logger = require('../../logger')
const User = require('../../models/user')
const { requiresLogin } = require('../middlewares')

authenticationRouter.get(
  '/authentication',
  requiresLogin,
  async (req, res, next) => {
    res.json({ ...req.session.user })
  }
)

authenticationRouter.post('/authentication', async (req, res, next) => {
  // Bypass LDAP authentication if NOT running in production mode.
  if (process.env.NODE_ENV !== 'production') {
    const { session } = req
    let user = await User.findByPk(1)
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
    // session.user = {
    //   id,
    //   username,
    //   email,
    //   firstName,
    //   lastName,
    //   score,
    //   targetGroup,
    // }

    return res.json(user)
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

// authenticationRouter.post('/signout', requiresLogin, (req, res, next) => {
//   req.session.destroy()
//   res.json()
// })

module.exports = authenticationRouter
