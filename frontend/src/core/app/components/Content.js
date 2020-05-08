import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => {
  return {
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(1),
      minHeight: `calc(100vh - 64px - ${theme.custom.footer.height}px
        - 2 * ${theme.spacing(1)}px)`,
    },
  }
}

const Content = ({ classes, children }) => (
  <div className={classes.content}>{children}</div>
)

export default withStyles(styles)(Content)
