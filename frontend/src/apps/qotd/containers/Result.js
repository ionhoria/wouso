import React from 'react'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import * as manifest from '../manifest'
import { selectAppData } from 'core/app/reducers'

import ResultComponent from '../components/Result'
import Unavailable from '../components/Unavailable'

import { getQotd } from '../actions'

function Answer(props) {
  const [fetchFailed, setfetchFailed] = useState(false)
  const { qotd } = props

  useEffect(() => {
    // Only fetch qotd if not already in redux or more than 24 hours old
    if (!qotd || Date.now() - new Date(qotd.day) > 24 * 60 * 60 * 1000) {
      props.getQotd().catch(() => setfetchFailed(true))
    }
  }, [qotd, props])

  if (fetchFailed)
    return <Unavailable />
  if (!qotd || Date.now() - new Date(qotd.day) > 24 * 60 * 60 * 1000) {
    return null
  }
  return <ResultComponent qotd={props.qotd} />

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
