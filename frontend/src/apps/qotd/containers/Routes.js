import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { selectOrchestration } from 'core/app/reducers'
import { selectApps } from 'core/app/reducers/orchestrationReducer'

import Answer from './Answer'
import Result from './Result'

class Routes extends React.Component {
  render () {
    return this.props.render([
      { path: '/', component: Answer },
      { path: 'result', component: Result }
    ])
  }
}

const selector = createSelector(
  selectOrchestration,
  selectApps,
  apps => ({
    apps
  })
)

export default connect(selector)(Routes)
