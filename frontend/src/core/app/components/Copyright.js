import React from 'react'

import Typography from '@material-ui/core/Typography'

const year = new Date().getFullYear()

const Copyright = () => <Typography>{year}© ROSEdu</Typography>

export default Copyright
