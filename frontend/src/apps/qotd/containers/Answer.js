import React from 'react'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import * as manifest from '../manifest'
import { selectAppData } from 'core/app/reducers'

import { getQotd, postQotd } from '../actions'
import AnswerComponent from '../components/Answer'
import Unavailable from '../components/Unavailable'

import { checkSession } from '../../../core/app/actions/session'

import { reduxForm } from 'redux-form'
const AnswerForm = reduxForm({ form: 'qotd/Answer' })(AnswerComponent)

class Answer extends React.Component {
  state = {
    fetchFailed: false,
  }

  componentDidMount() {
    const { qotd } = this.props
    // Only fetch qotd if not already in redux or more than 24 hours old
    if (!qotd || Date.now() - new Date(qotd.day) > 24 * 60 * 60 * 1000) {
      this.props.getQotd().catch(() => this.setState({ fetchFailed: true }))
    }
  }

  onSubmit = ({ answer }) => {
    const { day } = this.props.qotd
    this.props.postQotd({ day, answer }).then(() => {
      this.props.checkSession()
      this.props.history.push('/qotd/result')
    })
  }

  render() {
    const { qotd } = this.props
    if (this.state.fetchFailed) {
      return <Unavailable />
    }
    if (!qotd || Date.now() - new Date(qotd.day) > 24 * 60 * 60 * 1000) {
      return null
    }
    return <AnswerForm onSubmit={this.onSubmit} qotd={qotd} />
  }
}

const selector = createSelector(selectAppData(manifest), (qotd) => ({
  qotd,
}))

export default connect(selector, { getQotd, postQotd, checkSession })(Answer)
