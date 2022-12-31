import { Box, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <Box position={'fixed'} bottom={0} width={'100%'}>
      <Paper sx={{ p: 2 }} square>
        <Typography>
          Created by <Link to={'https://github.com/cryeprecision'}>Rico (----)</Link> and{' '}
          <Link to={'https://github.com/HydrofinLoewenherz'}>Paul (ujhtl)</Link>
        </Typography>
      </Paper>
    </Box>
  )
}
