import React from 'react'

import ErrorOutline from '@material-ui/icons/ErrorOutline'

import IconPage from 'core/pages/shared/components/IconPage'

const NotAuthorized = () => (
  <IconPage
    text='Pagina accesată necesită permisiuni suplimentare.'
    icon={ErrorOutline}
  />
)

export default NotAuthorized
