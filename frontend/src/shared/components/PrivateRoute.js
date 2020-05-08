import React from 'react'

import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
  component: RouteComponent,
  render,
  authenticated,
  ...rest
}) => {
  if (!authenticated) {
    return <Redirect to={`/signin?from=${rest.path}`} />
  }

  if (render !== undefined && typeof render === 'function') {
    return <Route render={render} {...rest} />
  }

  if (RouteComponent !== undefined) {
    return <Route component={RouteComponent} {...rest} />
  }

  throw new Error(
    'Either a render method or a component property must be passed.'
  )
}

export default PrivateRoute
