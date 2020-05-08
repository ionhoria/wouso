import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'

const styles = (theme) => ({
  paper: theme.paper,
  actions: theme.actions,
})

const Result = ({ classes, qotd }) => {
  let message = 'Ne pare rau! Ai răspuns incorect la întrebarea zilei.'
  if (!qotd.answer) message = 'Nu ai răspuns încă la întrebarea zilei.'
  if (qotd.answer.valid) {
    message = 'Felicitări! Ai răspuns corect la întrebarea zilei.'
  }
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">{message}</Typography>
      <div className={classes.actions}>
        <Button variant="contained" color="secondary" component={Link} to="/">
          Înapoi
        </Button>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(Result)
