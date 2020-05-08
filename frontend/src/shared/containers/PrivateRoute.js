import { connect } from 'react-redux'

import PrivateRouteComponent from '../components/PrivateRoute'
import { selectUser } from 'core/app/reducers'

const PrivateRoute = connect(state => ({
  authenticated: selectUser(state).authenticated
}))(PrivateRouteComponent)

export default PrivateRoute
