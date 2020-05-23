import React, { useState, useEffect } from 'react'
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

function Answer({ qotd, getQotd, postQotd, checkSession, history }) {
  const [fetchFailed, setFetchFailed] = useState(false)

  useEffect(() => {
    // Only fetch qotd if not already in redux or more than 24 hours old
    if (!qotd || Date.now() - new Date(qotd.day) > 24 * 60 * 60 * 1000) {
      getQotd().catch(() => setFetchFailed(true))
    }
  }, [qotd, getQotd])

  const onSubmit = ({ answer }) => {
    const { day } = qotd
    postQotd({ day, answer }).then(() => {
      checkSession()
      history.push('/qotd/result')
    })
  }

  if (fetchFailed) {
    return <Unavailable />
  }
  if (!qotd || Date.now() - new Date(qotd.day) > 24 * 60 * 60 * 1000) {
    return null
  }
  return <AnswerForm onSubmit={onSubmit} qotd={qotd} />

}

const selector = createSelector(selectAppData(manifest), (qotd) => ({
  qotd,
}))

export default connect(selector, { getQotd, postQotd, checkSession })(Answer)
