import { applyMiddleware } from 'redux'
import { createStore } from 'redux-dynamic-reducer'

import thunk from 'redux-thunk'

import rootReducer from './reducers'
import api, { mock } from './middleware/api'

// const log = ({ ignore }) => store => next => action => {
//   if (
//     !ignore ||
//     !ignore.some(actionType => action.type.startsWith(actionType))
//   ) {
//     console.log(action.type)
//   }

//   next(action)
// }

// let enhancer = applyMiddleware(thunk, log({ ignore: ['@@redux'] }), mock(api))
let enhancer = applyMiddleware(thunk, mock(api))

const store = createStore(rootReducer, enhancer)

export default store
