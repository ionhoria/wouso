import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from 'shared/containers/PrivateRoute'
import SignIn from 'core/pages/signin'
import Home from 'core/pages/home'
import NotFound from 'core/pages/notFound'
import NotAuthorized from 'core/pages/notAuthorized'

const ContentSwitch = ({ routes }) => (
  <Switch>
    <Route exact path='/signin' component={SignIn} />
    <PrivateRoute exact path='/' component={Home} />
    <Route exact path='/not-authorized' component={NotAuthorized} />
    {routes}
    <Route component={NotFound} />
  </Switch>
)

export default ContentSwitch
