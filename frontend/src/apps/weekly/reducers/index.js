import { SET_QUEST, CLEAR_QUEST } from '../actions/types'

const rootReducer = (state = null, action) => {
  switch (action.type) {
    case SET_QUEST:
      return action.payload
    case CLEAR_QUEST:
      return null
    default:
      return state
  }
}

export default rootReducer
