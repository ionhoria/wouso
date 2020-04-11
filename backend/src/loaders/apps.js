const { Router } = require('express')
const apps = require('../apps')

module.exports = () => {
  const routes = Router()
  const models = {}

  Object.keys(apps).forEach((appName) => {
    const app = apps[appName]
    routes.use(`/${appName}`, app.routes)
    Object.assign(models, app.models)
  })

  return { routes, models }
}
