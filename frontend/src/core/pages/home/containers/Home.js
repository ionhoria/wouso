import { connect } from 'react-redux'

import HomeComponent from '../components/Home'
import { selectUser } from 'core/app/reducers'

import { createSelector } from 'reselect'

const selector = createSelector(selectUser, user => ({ user }))

export default connect(selector)(HomeComponent)
