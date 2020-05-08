import React from 'react'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import * as manifest from '../manifest'
import { selectAppData } from 'core/app/reducers'

import ResultComponent from '../components/Result'
import Unavailable from '../components/Unavailable'

import { getQotd } from '../actions'

class Answer extends React.Component {
  state = { fetchFailed: false }

  componentDidMount () {
    const { qotd } = this.props
    // Only fetch qotd if not already in redux or more than 24 hours old
    if (!qotd || Date.now() - new Date(qotd.day) > 24 * 60 * 60 * 1000) {
      this.props.getQotd().catch(() => this.setState({ fetchFailed: true }))
    }
  }

  render () {
    const { qotd } = this.props
    if (this.state.fetchFailed) return <Unavailable />
    if (!qotd || Date.now() - new Date(qotd.day) > 24 * 60 * 60 * 1000) {
      return null
    }
    return <ResultComponent qotd={this.props.qotd} />
  }
}

const selector = createSelector(
  selectAppData(manifest),
  qotd => ({
    qotd
  })
)

export default connect(
  selector,
  { getQotd }
)(Answer)
