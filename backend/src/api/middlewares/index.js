const HttpStatus = require('http-status-codes')
const { ServerError } = require('../errors')

/**
 * Wraps @handler in a try-catch statement and returns a new @RequestHandler.
 *
 * @param {RequestHandler} handler
 * @return {RequestHandler}
 */
module.exports.catchAll = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next)
  } catch (err) {
    next(err)
  }
}

module.exports.requiresLogin = (req, res, next) => {
  const { session } = req

  if (!session || !session.user) {
    return next(
      new ServerError(
        HttpStatus.UNAUTHORIZED,
        'You must be logged in to access this.'
      )
    )
  }

  next()
}
