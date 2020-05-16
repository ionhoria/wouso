import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  paper: theme.paper,
  actions: theme.actions
})

const Unavailable = ({ classes, qotd }) => (
  <Paper className={classes.paper}>
    <Typography variant='h6'>
      Weekly Quest nu este activ în acest moment.
    </Typography>
    <div className={classes.actions}>
      <Button variant='contained' color='secondary' component={Link} to='/'>
        Înapoi
      </Button>
    </div>
  </Paper>
)

export default withStyles(styles)(Unavailable)
