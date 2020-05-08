import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  container: {
    height: theme.custom.footer.height,
  },
  content: {
    paddingLeft: theme.custom.drawer.width,
    display: 'flex',
    justifyContent: 'center',
    width: `calc(100% - ${theme.custom.drawer.width}px)`,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      width: '100%',
    },
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
})

const Footer = ({ classes, children }) => (
  <div className={classes.container}>
    <Divider />
    <div className={classes.content}>{children}</div>
  </div>
)

export default withStyles(styles)(Footer)
