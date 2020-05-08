import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import withStyles from '@material-ui/core/styles/withStyles'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'

const styles = (theme) => ({
  drawerPaper: { width: theme.custom.drawer.width },
  toolbar: theme.mixins.toolbar,
  actions: {
    padding: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
  },
  account: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountDetails: { flex: 1, textAlign: 'center' },
})

class Sidebar extends React.Component {
  render() {
    const {
      classes,
      children,
      mobileSidebar,
      toggleMobileSidebar,
      user,
      signOut,
    } = this.props

    const sidebarContent = user.authenticated && (
      <>
        <div className={classes.account}>
          <AccountCircle color="secondary" style={{ fontSize: '36px' }} />
          <div className={classes.accountDetails}>
            <Typography variant="h6">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography>
              Puncte: <b>{user.score}</b>
            </Typography>
          </div>
        </div>
        <div className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            to="/"
            className={classes.button}
          >
            Acasă
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={signOut}
            className={classes.button}
          >
            Deconectare
          </Button>
        </div>
        {children}
      </>
    )

    return (
      <div>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            anchor="left"
            variant="permanent"
          >
            <div className={classes.toolbar} />
            {sidebarContent}
          </Drawer>
        </Hidden>
        <Hidden smUp implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            anchor="left"
            variant="temporary"
            open={mobileSidebar}
            onClose={toggleMobileSidebar}
          >
            <div className={classes.toolbar} />
            <Divider />
            <div onClick={toggleMobileSidebar}>{sidebarContent}</div>
          </Drawer>
        </Hidden>
      </div>
    )
  }
}

export default withStyles(styles)(Sidebar)
