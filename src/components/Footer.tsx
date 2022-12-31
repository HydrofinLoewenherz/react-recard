import { Box, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <Box>
      <Paper sx={{ p: 2 }} square>
        <Typography>
          Created by <Link to={'https://github.com/cryeprecision'}>Rico Münch (uozjn)</Link> and{' '}
          <Link to={'https://github.com/HydrofinLoewenherz'}>Paul Wagner (ujhtl)</Link>
        </Typography>
      </Paper>
    </Box>
  )
}
