import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../actions/types'

export const isUiLoading = state => state !== 0

const loadingReducer = (state = 0, action) => {
  switch (action.type) {
    case API_REQUEST:
      return state + 1
    case API_SUCCESS:
    case API_FAILURE:
      return state - 1
    default:
      return state
  }
}

export default loadingReducer
