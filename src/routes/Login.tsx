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
    alert("Couldn't sign up")
  }
  const onLogin = () => {
    clearInput()
    setError('Invalid user')
    alert('Invalid user')
  }

  const validInput = username !== '' && password !== ''

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center' sx={{ minHeight: '100vh' }}>
      <Grid xs={12} md={6} lg={3}>
        <Box sx={{ p: 2 }}>
          <Stack gap={2}>
            <Typography variant='h4' sx={{ mx: 'auto' }}>
              Login
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
