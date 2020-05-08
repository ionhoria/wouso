import React, { Component } from 'react'
import { reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { parse } from 'querystring'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import SignInForm from '../components/SignInForm'
import { signIn } from '../actions'
import { isUserAuthenticated } from '../reducers/user'

const styles = theme => ({
  paper: theme.paper
})

const Form = reduxForm({ form: 'signIn' })(SignInForm)

class SignIn extends Component {
  handleSubmit = ({ username, password }) =>
    this.props.signIn(username, password).catch(() => {
      throw new SubmissionError({
        _error: 'Datele de autentificare introduse sunt invalide!'
      })
    })

  renderRedirect () {
    const {
      location: { search }
    } = this.props
    const { from } = parse(search.substr(1))

    return <Redirect to={from || '/'} />
  }

  render () {
    const { classes, authenticated } = this.props

    if (authenticated) {
      return this.renderRedirect()
    }

    return (
      <Paper className={classes.paper}>
        <Form onSubmit={this.handleSubmit} />
      </Paper>
    )
  }
}

export default connect(
  state => ({ authenticated: isUserAuthenticated(state) }),
  { signIn }
)(withStyles(styles)(SignIn))
