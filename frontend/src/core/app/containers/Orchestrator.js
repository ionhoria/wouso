import React from 'react'
import { connect } from 'react-redux'
import { matchPath } from 'react-router'
import { withRouter, Switch } from 'react-router-dom'
import { createSelector } from 'reselect'
import path from 'path'

import { selectUser, selectOrchestration } from '../reducers'
import store from '../store'
import { getApps } from '../actions/apps'
import { selectApps } from '../reducers/orchestrationReducer'
import manifests from 'apps/manifests'
import NavList from '../components/NavList'
import PrivateRoute from 'shared/containers/PrivateRoute'
import { appDataKey } from '../shared/utils/apps'
import { signOut } from '../../pages/signin/actions'

class Orchestrator extends React.Component {
  state = {
    usable: [],
  }

  componentDidMount() {
    this.props.getApps()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.apps !== prevProps.apps) {
      const apps = new Set(this.props.apps)

      const usable = manifests.filter((manifest) =>
        /* Check if all required backend apps are installed */
        manifest.requiredBackendApps.every((req) => apps.has(req))
      )

      usable.forEach((manifest) =>
        store.attachReducers({
          [appDataKey(manifest)]: manifest.reducer,
        })
      )

      this.setState({ usable })
    }
  }

  handleNavigate = (path) => this.props.history.push(path)

  makeRelativeNavigation = (baseUrl, navigation) => {
    const { path: navPath, sub, ...rest } = navigation

    return {
      path: navPath && path.join(baseUrl, navPath),
      sub: sub && sub.map((nav) => this.makeRelativeNavigation(baseUrl, nav)),
      ...rest,
    }
  }

  expandMatch = (path, navigation) => {
    let anyMatch = false

    if (!navigation) {
      return false
    }

    if (navigation.sub) {
      navigation.sub.forEach((navigation) => {
        if (this.expandMatch(path, navigation)) {
          anyMatch = true
        }
      })
    }

    navigation.expanded =
      anyMatch || matchPath(path, { path: navigation.path, exact: true })

    return navigation.expanded
  }

  renderNavigation = (manifest) => {
    const { navigation: Navigation, title, baseUrl } = manifest

    return (
      <Navigation
        key={title}
        render={(nav) => {
          let root = { title, sub: nav, path: '/' }
          root = this.makeRelativeNavigation(path.join('/', baseUrl), root)
          this.expandMatch(this.props.location.pathname, root)

          return <NavList {...root} onNavigate={this.handleNavigate} />
        }}
      />
    )
  }

  renderRoutes = (manifest) => {
    const { routes: Routes, baseUrl } = manifest

    return (
      <PrivateRoute
        key={baseUrl}
        path={path.join('/', baseUrl)}
        render={() => (
          <Routes
            key={baseUrl}
            render={(routes) => (
              <Switch>
                {routes.map(({ path: routePath, render, component }) => (
                  <PrivateRoute
                    key={routePath}
                    path={path.join('/', baseUrl, routePath)}
                    exact
                    render={render}
                    component={component}
                  />
                ))}
              </Switch>
            )}
          />
        )}
      />
    )
  }

  getTitle() {
    const {
      location: { pathname },
    } = this.props
    const { usable } = this.state
    const activeApp = usable.find((manifest) =>
      pathname.startsWith(path.join('/', manifest.baseUrl))
    )

    return activeApp ? activeApp.title : ''
  }

  render() {
    return this.props.render({
      navigation: this.state.usable.map(this.renderNavigation),
      routes: this.state.usable.map(this.renderRoutes),
      title: this.getTitle(),
      user: this.props.user,
      signOut: this.props.signOut,
    })
  }
}

const selector = createSelector(
  selectUser,
  createSelector(selectOrchestration, selectApps),
  (user, apps) => ({ user, apps })
)

export default withRouter(connect(selector, { getApps, signOut })(Orchestrator))
