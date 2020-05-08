import React from 'react'

import ErrorOutline from '@material-ui/icons/ErrorOutline'

import IconPage from 'core/pages/shared/components/IconPage'

const NotFound = () => (
  <IconPage text='Pagina căutată nu există.' icon={ErrorOutline} />
)

export default NotFound
