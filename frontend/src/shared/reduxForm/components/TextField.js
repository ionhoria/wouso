import React from 'react'
import Wrapped from '@material-ui/core/TextField'

const TextField = ({ input, meta, ...rest }) => {
  const hasError = !!(meta.touched && meta.error)

  return (
    <React.Fragment>
      <Wrapped
        error={hasError}
        {...input}
        {...rest}
        helperText={hasError && meta.error}
      />
    </React.Fragment>
  )
}

export default TextField
