import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import logoWhite from '../../../media/logoWhite.png'

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
    height: '56px',
    maxHeight: '56px',
  },
  title: {
    marginLeft: theme.spacing(3),
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  account: {
    marginRight: theme.spacing(2),
    paddingLeft: theme.spacing(1),
  },
  home: {
    fontSize: '36px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
})

class Header extends React.Component {
  render() {
    const { classes, title, toggleMobileSidebar } = this.props
    return (
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Open sidebar"
            onClick={toggleMobileSidebar}
            className={classes.home}
          >
            <MenuIcon style={{ fontSize: '36px' }} />
          </IconButton>
          <img height="48px" src={logoWhite} alt="World of USO" />
          <Typography variant="h6" color="inherit" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)
