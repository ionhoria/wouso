import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
  container: {
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 5000,
    backgroundColor: theme.palette.background.default,
    opacity: 0.8
  },
  progressRoot: {
    position: 'absolute',
    width: '100%',
    zIndex: 5001
  }
})

class LoadingOverlay extends React.Component {
  state = {
    loading: false
  }

  setLoading (loading) {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }

    this.setState({ loading })
  }

  componentDidUpdate (prevProps, prevState) {
    /* Nothing to do here */
    if (this.props.loading === prevProps.loading) {
      return
    }

    /* Stop loading instantly */
    if (!this.props.loading) {
      return this.setLoading(false)
    }

    const { delay } = this.props

    if (!delay || delay < 0) {
      /* Start loading instantly */
      this.setLoading(true)
    } else {
      /* Delay loading */
      this.timeout = setTimeout(() => this.setLoading(true), delay)
    }
  }

  render () {
    const { classes, children } = this.props
    const { loading } = this.state

    return (
      <div className={classes.container}>
        {loading &&
          <div>
            <LinearProgress
              color='secondary'
              classes={{ root: classes.progressRoot }}
            />
            <div className={classes.overlay} />
          </div>}
        {children}
      </div>
    )
  }
}

export default withStyles(styles)(LoadingOverlay)
