class ServerError extends Error {
  constructor(status, message) {
    if (typeof status !== 'number' || status < 100 || status >= 600) {
      throw new TypeError('Invalid ServerError status.')
    }

    if (typeof message !== 'string') {
      throw new TypeError('Invalid ServerError message.')
    }
    super(message)
    this.name = this.constructor.name
    this.status = status
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  ServerError,
}
