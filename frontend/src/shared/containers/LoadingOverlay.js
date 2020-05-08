import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { selectLoading, selectUi } from 'core/app/reducers'
import { isUiLoading } from 'core/app/reducers/loadingReducer'
import LoadingOverlayComponent from '../components/LoadingOverlay'

const isLoading = createSelector(
  selectUi,
  createSelector(
    selectLoading,
    createSelector(isUiLoading, loading => ({ loading }))
  )
)

const LoadingOverlay = connect(isLoading)(LoadingOverlayComponent)

export default LoadingOverlay
