import { API_REQUEST, API_SUCCESS, API_FAILURE } from './types'

export const apiRequest = ({ method, path, data, success, failure }) => ({
  type: API_REQUEST,
  payload: { method, path, data, success, failure }
})

export const apiSuccess = ({ method, path, data }) => ({
  type: API_SUCCESS,
  payload: {
    method,
    path,
    data
  }
})

export const apiFailure = ({ method, path, data }) => ({
  type: API_FAILURE,
  payload: {
    method,
    path,
    data
  }
})
