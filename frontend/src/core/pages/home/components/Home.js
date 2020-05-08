import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  paper: theme.paper,
})

const Home = ({ classes, user }) => (
  <Paper className={classes.paper}>
    <Typography variant="h6" gutterBottom>
      Bine ai venit, {user.firstName}!
    </Typography>
    <Typography gutterBottom>
      Folosește meniul din partea stângă pentru a alege un joc. Distracţie
      placută!
    </Typography>
  </Paper>
)

export default withStyles(styles)(Home)
