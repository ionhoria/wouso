import RadioGroup from '@material-ui/core/RadioGroup'

import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  group: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
})

const WrappedRadioGroup = ({ classes, input, answer, ...rest }) => {
  return (
    <RadioGroup
      {...rest}
      className={classes.group}
      value={answer || input.value}
      onChange={(e, value) => input.onChange(value)}
    />
  )
}

export default withStyles(styles)(WrappedRadioGroup)
