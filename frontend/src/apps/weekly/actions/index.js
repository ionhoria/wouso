import { apiRequest } from 'core/app/actions/api'
import { SET_QUEST, CLEAR_QUEST } from './types'

const ROOT_URL = 'apps/weekly'

export const getQuest = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiRequest({
        method: 'GET',
        path: ROOT_URL,
        success: payload => dispatch => {
          dispatch(setQuest(payload))
          resolve(payload)
        },
        failure: err => dispatch => {
          dispatch(clearQuest())
          reject(err)
        }
      })
    )
  )

const setQuest = quest => {
  return {
    type: SET_QUEST,
    payload: quest
  }
}

const clearQuest = () => {
  return {
    type: CLEAR_QUEST
  }
}

export const postQuest = quest => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiRequest({
        method: 'POST',
        path: ROOT_URL,
        data: quest,
        success: payload => dispatch => {
          dispatch(clearQuest())
          resolve(payload)
        },
        failure: err => () => reject(err)
      })
    )
  )
