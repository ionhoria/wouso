import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, withRouter } from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'

import store from '../store'
import theme from '../theme'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Footer from '../components/Footer'
import Copyright from '../components/Copyright'
import SessionChecker from '../containers/SessionChecker'
import ContentSwitch from '../components/ContentSwitch'
import ContentPadding from '../components/ContentPadding'
import LoadingOverlayComponent from 'shared/containers/LoadingOverlay'
import Orchestrator from '../containers/Orchestrator'

/* LoadingOverlayComponent is connected to redux and blocks route updates. See
 * https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md
 * for more details.
 */

const LoadingOverlay = withRouter(LoadingOverlayComponent)

class App extends React.Component {
  state = {
    mobileSidebar: false,
  }

  toggleMobileSidebar = () => {
    this.setState({ mobileSidebar: !this.state.mobileSidebar })
  }

  renderContent = ({ navigation, routes, title, user, signOut }) => {
    return (
      <React.Fragment>
        <Sidebar
          mobileSidebar={this.state.mobileSidebar}
          toggleMobileSidebar={this.toggleMobileSidebar}
          user={user}
          signOut={signOut}
        >
          {navigation}
        </Sidebar>
        <Header
          title={title}
          user={user}
          toggleMobileSidebar={this.toggleMobileSidebar}
        />
        <ContentPadding>
          <LoadingOverlay delay={1000}>
            <Content>
              <SessionChecker>
                <ContentSwitch routes={routes} />
              </SessionChecker>
            </Content>
          </LoadingOverlay>
        </ContentPadding>
        <Footer>
          <Copyright />
        </Footer>
      </React.Fragment>
    )
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Orchestrator render={this.renderContent} />
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
