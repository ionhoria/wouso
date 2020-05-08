import { apiRequest } from 'core/app/actions/api'
import { SET_APPS } from './types'

export const setApps = apps => ({
  type: SET_APPS,
  payload: apps
})

export const getApps = () => dispatch =>
  dispatch(
    apiRequest({
      method: 'GET',
      path: 'apps',
      success: setApps
    })
  )
