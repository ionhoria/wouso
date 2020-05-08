import React from 'react'
import { Field } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from 'shared/reduxForm/components/TextField'
import { required } from 'utils/validators'

const styles = theme => ({
  actions: {
    paddingTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

const SignInForm = ({ classes, onSubmit, valid, handleSubmit, error }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Typography variant="h6" gutterBottom>
      Autentifică-te
    </Typography>
    <Typography gutterBottom>
      folosind contul tău de student (acs.curs.pub.ro)
    </Typography>
    <Field
      component={TextField}
      name="username"
      label="Utilizator"
      fullWidth
      margin="normal"
      validate={required}
      autoComplete="username"
    />
    <Field
      component={TextField}
      name="password"
      label="Parolă"
      fullWidth
      margin="normal"
      type="password"
      validate={required}
      autoComplete="password"
    />
    {error && (
      <Typography style={{ color: '#F00' }} color="secondary">
        {error}
      </Typography>
    )}
    <div className={classes.actions}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!valid}
      >
        Autentificare
      </Button>
    </div>
  </form>
)

export default withStyles(styles)(SignInForm)
