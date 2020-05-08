import { apiRequest } from 'core/app/actions/api'
import { SET_QOTD, CLEAR_QOTD } from './types'

const ROOT_URL = 'apps/qotd'

export const getQotd = () => (dispatch) =>
  new Promise((resolve, reject) =>
    dispatch(
      apiRequest({
        method: 'GET',
        path: ROOT_URL,
        success: (payload) => (dispatch) => {
          dispatch(setQotd(payload))
          resolve(payload)
        },
        failure: (err) => (dispatch) => {
          dispatch(clearQotd())
          reject(err)
        },
      })
    )
  )

const setQotd = (qotd) => {
  return {
    type: SET_QOTD,
    payload: qotd,
  }
}

const clearQotd = () => {
  return {
    type: CLEAR_QOTD,
  }
}

export const postQotd = (qotd) => (dispatch) =>
  new Promise((resolve, reject) =>
    dispatch(
      apiRequest({
        method: 'POST',
        path: ROOT_URL,
        data: qotd,
        success: (payload) => () => {
          dispatch(clearQotd())
          resolve(payload)
        },
        failure: (err) => () => {
          reject(err)
        },
      })
    )
  )
