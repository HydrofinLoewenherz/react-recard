import { Button, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Link } from 'react-router-dom'

export const LoginRedirect = () => {
  return (
    <Grid container direction='column' alignItems='center' justifyContent='center' sx={{ minHeight: '50vh' }}>
      <Grid xs={12} md={6} lg={3}>
        <Paper sx={{ p: 2, m: 2 }} elevation={1}>
          <Stack gap={2}>
            <Typography variant='body1' sx={{ mx: 'auto' }}>
              You need to be signed-in to view this page.
            </Typography>
            <Typography variant='body1' sx={{ mx: 'auto' }}>
              <Button size='small' variant='outlined' component={Link} to='/login'>
                sign in
              </Button>{' '}
              or{' '}
              <Button size='small' variant='outlined' component={Link} to='/login'>
                create a new account
              </Button>
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  )
}
