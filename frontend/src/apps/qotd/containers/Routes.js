import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { selectOrchestration } from 'core/app/reducers'
import { selectApps } from 'core/app/reducers/orchestrationReducer'

import Answer from './Answer'
import Result from './Result'

function Routes(props) {
  return props.render([
    { path: '/', component: Answer },
    { path: 'result', component: Result },
  ])
}

const selector = createSelector(selectOrchestration, selectApps, (apps) => ({
  apps,
}))

export default connect(selector)(Routes)
