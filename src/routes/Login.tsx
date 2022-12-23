import { Box, ButtonGroup, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { exists, isKnown, setKnown, useAuthStore } from '../store/auth'
import { FormButton } from '../components/FormButton'

export const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const store = useAuthStore()

  const clearInput = (): void => {
    setUsername('')
    setPassword('')
    setStayLoggedIn(false)
  }

  const onSignup = () => {
    if (exists(username)) {
      alert('Username already exists')
    } else {
      setKnown({ username, password })
      alert('Created user, you can login now')
    }
    clearInput()
  }
  const onLogin = () => {
    if (isKnown({ username, password })) {
      store.setCredentials({ username, password }, stayLoggedIn)
    } else {
      alert!('Invalid username or password')
    }
    clearInput()
  }
  const onLogout = () => {
    store.unsetCredentials()
  }

  const validPassword = password !== '' && /\d{2,}/i.test(password)
  const validInput = username !== '' && validPassword

  const Login_ = () => (
    <Stack gap={2}>
      <Typography variant='h4' sx={{ mx: 'auto' }}>
        Login
      </Typography>
      <TextField value={username} onChange={({ target }) => setUsername(target.value)} label='Username' />
      <TextField value={password} onChange={({ target }) => setPassword(target.value)} label='Password' />
      <ButtonGroup>
        <FormButton onClick={onLogin} fullWidth disabled={!validInput}>
          Login
        </FormButton>
        <FormButton onClick={onSignup} fullWidth disabled={!validInput}>
          Signup
        </FormButton>
      </ButtonGroup>
      <FormControlLabel
        control={<Checkbox checked={stayLoggedIn} onChange={({ target }) => setStayLoggedIn(target.checked)} />}
        label='Stay logged in'
      />
    </Stack>
  )
  const Logout_ = () => (
    <Stack gap={2}>
      <Typography variant='h4' sx={{ mx: 'auto' }}>
        {`Hello, ${store.username}`}
      </Typography>
      <FormButton onClick={onLogout} fullWidth>
        Logout
      </FormButton>
    </Stack>
  )

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center' sx={{ minHeight: '100vh' }}>
      <Grid xs={12} md={6} lg={3}>
        <Box sx={{ p: 2 }}>{(store.hasCredentials() && Logout_()) || Login_()}</Box>
      </Grid>
    </Grid>
  )
}
