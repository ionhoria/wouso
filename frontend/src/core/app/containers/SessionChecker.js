import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { withRouter } from 'react-router-dom'

import { selectSession } from '../reducers'
import { selectIsSessionChecked } from '../reducers/sessionReducer'
import { checkSession } from '../actions/session'

class SessionChecker extends React.Component {
  componentDidMount() {
    const { checkSession } = this.props

    const checked = this.props.checked
    if (!checked) {
      checkSession()
    }
  }

  render() {
    const { checked, children } = this.props

    return checked ? children : null
  }
}

const selector = createSelector(
  selectSession,
  selectIsSessionChecked,
  (checked) => ({ checked })
)

export default withRouter(connect(selector, { checkSession })(SessionChecker))
