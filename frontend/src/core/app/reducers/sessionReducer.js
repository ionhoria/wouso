import { SET_CHECKED_SESSION } from '../actions/types'

export const selectIsSessionChecked = state => state

export default (state = false, action) => {
  switch (action.type) {
    case SET_CHECKED_SESSION:
      return action.payload
    default:
      return state
  }
}
