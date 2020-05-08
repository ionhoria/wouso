import React from 'react'
import { Field } from 'redux-form'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import WrappedRadioGroup from './WrappedRadioGroup'

import withStyles from '@material-ui/core/styles/withStyles'

import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

const styles = (theme) => ({
  paper: theme.paper,
  actions: {
    paddingTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: '10px',
  },
  warn: {
    textAlign: 'right',
  },
})

const required = (value) => (!value ? 'Trebuie să alegi un răspuns' : undefined)

const Answer = ({ classes, qotd, handleSubmit, onSubmit }) => {
  const { answers, text: questionText } = qotd.question
  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="h6"
          dangerouslySetInnerHTML={{ __html: md.renderInline(questionText) }}
        />
        <FormControl component="fieldset" fullWidth>
          <Field
            name="answer"
            component={WrappedRadioGroup}
            answer={qotd.answer ? qotd.answer.answer : null}
            validate={required}
          >
            {answers.map((answer, index) => (
              <FormControlLabel
                key={index}
                value={answer}
                control={<Radio />}
                label={
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: md.renderInline(answer),
                    }}
                  />
                }
              />
            ))}
          </Field>
        </FormControl>

        {qotd.answer && (
          <Typography className={classes.warn}>
            Ai răspuns <b>{qotd.answer.valid ? 'corect' : 'incorect'}</b> la
            întrebarea zilei.
            <br />
            Revino mâine pentru o nouă întrebare!
          </Typography>
        )}
        <div className={classes.actions}>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={'/'}
          >
            Înapoi
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!!qotd.answer}
            className={classes.button}
          >
            Răspunde
          </Button>
        </div>
      </form>
    </Paper>
  )
}

export default withStyles(styles)(Answer)
