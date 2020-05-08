import { SET_CHECKED_SESSION } from './types'
import { apiRequest } from './api'
import { setUser } from '../../pages/signin/actions'

export const setCheckedSession = (checked) => ({
  type: SET_CHECKED_SESSION,
  payload: checked,
})

export const checkSession = () => (dispatch) =>
  dispatch(
    apiRequest({
      method: 'GET',
      path: 'session',
      success: (user) => (dispatch) => {
        dispatch(setUser(user))
        dispatch(setCheckedSession(true))
      },
      failure: () => setCheckedSession(true),
    })
  )
