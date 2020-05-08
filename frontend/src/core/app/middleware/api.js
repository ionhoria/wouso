import axios from 'axios'
import path from 'path'

import { API_REQUEST } from '../actions/types'
import { apiSuccess, apiFailure } from '../actions/api'

const ROOT_URL = `${window.location.origin.replace(
  window.location.port,
  '5000'
)}/api`

const mockHandlers = {
  GET: {},
  POST: {},
  PUT: {},
  PATCH: {},
  DELETE: {},
}

export const mock = (real) => (store) => (next) => (action) => {
  if (action.type !== API_REQUEST) {
    return real(store)(next)(action)
  }

  const { method, path } = action.payload

  if (
    !mockHandlers[method][path] ||
    !mockHandlers[method][path](store.dispatch, action)
  ) {
    return real(store)(next)(action)
  }

  return next(action)
}

export default ({ dispatch }) => (next) => (action) => {
  if (action.type === API_REQUEST) {
    const { method, path: requestPath, data, success, failure } = action.payload

    const axiosConfig = {
      url: requestPath,
      method: method.toLowerCase(),
      baseURL: ROOT_URL,
      data,
      withCredentials: true,
    }

    axios
      .request(axiosConfig)
      .then((response) => response.data)
      .then((data) => {
        dispatch(apiSuccess({ method, path, data }))

        if (success) {
          dispatch(success(data))
        }
      })
      .catch((err) => {
        dispatch(apiFailure({ method, path, data }))

        if (failure) {
          dispatch(failure(err))
        }
      })
  }

  next(action)
}
