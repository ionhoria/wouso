import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import * as manifest from '../manifest'
import { selectAppData } from 'core/app/reducers'

import { getQuest, postQuest } from '../actions'
import AnswerComponent from '../components/Answer'

import { checkSession } from '../../../core/app/actions/session'

import { reduxForm, SubmissionError } from 'redux-form'
import Unavailable from '../components/Unavailable'
const AnswerForm = reduxForm({ form: 'weekly/Answer' })(AnswerComponent)

class Answer extends React.Component {
  componentDidMount () {
    this.fetchQuest()
  }

  onSubmit = answer =>
    this.props
      .postQuest(answer)
      .then(() => {
        this.props.checkSession()
        this.fetchQuest()
      })
      .catch(() => {
        throw new SubmissionError({
          answer: 'Răspunsul nu este corect!'
        })
      })

  fetchQuest = () => {
    this.props.getQuest().catch(() => {

    })
  }

  render () {
    const { quest } = this.props
    if (!quest) {
      return <Unavailable />
    }
    return <AnswerForm onSubmit={this.onSubmit} quest={quest} />
  }
}

const selector = createSelector(
  selectAppData(manifest),
  quest => ({
    quest
  })
)

export default connect(
  selector,
  { getQuest, postQuest, checkSession }
)(Answer)
