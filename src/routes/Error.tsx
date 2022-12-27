import { Box, Typography } from '@mui/material'
import { ErrorResponse } from '@remix-run/router'
import { useRouteError } from 'react-router-dom'

export const Error = () => {
  const error = useRouteError() as ErrorResponse

  return (
    <Box>
      <Typography variant='h4'>
        {error.status} - {error.statusText}
      </Typography>
      <Typography variant='body1'>{error.data}</Typography>
    </Box>
  )
}
