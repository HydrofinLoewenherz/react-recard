import { Box, Paper, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <Box>
      <Paper sx={{ p: 2 }} square>
        <Typography>
          Created by{' '}
          <a target='_blank' rel='noreferrer' href={'https://github.com/cryeprecision'}>
            Rico Münch (uozjn)
          </a>{' '}
          and{' '}
          <a target='_blank' rel='noreferrer' href={'https://github.com/HydrofinLoewenherz'}>
            Paul Wagner (ujhtl)
          </a>
        </Typography>
      </Paper>
    </Box>
  )
}
