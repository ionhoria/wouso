import { combineReducers } from 'redux'

import formReducer from './formReducer'
import loadingReducer from './loadingReducer'
import userReducer from 'core/pages/signin/reducers/user'
import orchestrationReducer from './orchestrationReducer'
import { appDataKey } from '../shared/utils/apps'
import sessionReducer from './sessionReducer'

export const selectUser = state => state.user
export const selectOrchestration = state => state.orchestration
export const selectSession = state => state.session
export const selectUi = state => state.ui
export const selectLoading = state => state.loading
export const selectAppData = manifest => state =>
  state[appDataKey(manifest.default ? manifest.default : manifest)]

export default combineReducers({
  form: formReducer,
  user: userReducer,
  orchestration: orchestrationReducer,
  session: sessionReducer,
  ui: combineReducers({ loading: loadingReducer })
})
