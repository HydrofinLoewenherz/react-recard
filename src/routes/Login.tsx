import { Box, Button, ButtonGroup, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'

export const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const clearInput = (): void => {
    setUsername('')
    setPassword('')
    setStayLoggedIn(false)
  }

  const onSignup = () => {
    clearInput()
    setError("Couldn't sign up")
  }
  const onLogin = () => {
    clearInput()
    setError('Invalid user')
  }

  const validInput = username !== '' && password !== ''
  const headerText = error === null ? 'Login' : `Login (Error: ${error})`

  return (
    <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center' style={{ minHeight: '70vh' }}>
      <Grid xs={3}>
        <Box sx={{ width: { xs: '100vw', md: '50vw', lg: '25vw' } }}>
          <Stack gap={2}>
            <Typography variant='h4' sx={{ mx: 'auto' }}>
              {headerText}
            </Typography>
            <TextField value={username} onChange={({ target }) => setUsername(target.value)} label='Username' />
            <TextField value={password} onChange={({ target }) => setPassword(target.value)} label='Password' />
            <ButtonGroup>
              <Button onClick={onLogin} fullWidth disabled={!validInput}>
                Login
              </Button>
              <Button onClick={onSignup} fullWidth disabled={!validInput}>
                Signup
              </Button>
            </ButtonGroup>
            <FormControlLabel
              control={<Checkbox checked={stayLoggedIn} onChange={({ target }) => setStayLoggedIn(target.checked)} />}
              label='Stay logged in'
            />
          </Stack>
          <Stack gap={0}></Stack>
        </Box>
      </Grid>
    </Grid>
  )
}
