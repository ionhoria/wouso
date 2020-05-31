import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { selectOrchestration } from 'core/app/reducers'
import { selectApps } from 'core/app/reducers/orchestrationReducer'

function Navigation(props) {
  return props.render()
}

const selector = createSelector(selectOrchestration, selectApps, (apps) => ({
  apps,
}))

export default connect(selector)(Navigation)
