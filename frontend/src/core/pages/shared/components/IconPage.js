import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  icon: {
    fontSize: theme.custom.icon.error.size,
    marginBottom: theme.spacing(1),
  },
})

const IconPage = ({ classes, text, icon: Icon }) => (
  <React.Fragment>
    <Icon className={classes.icon} />
    <Typography variant="h6" gutterBottom>
      {text}
    </Typography>
  </React.Fragment>
)

export default withStyles(styles)(IconPage)
