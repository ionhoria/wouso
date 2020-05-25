import Navigation from './containers/Navigation'
import Routes from './containers/Routes'
import rootReducer from './reducers'

export default {
  // title: 'Weekly Quest',
  title: 'Weekend Quest',
  baseUrl: 'weekly',
  requiredBackendApps: ['weekly'],
  routes: Routes,
  navigation: Navigation,
  reducer: rootReducer
}
