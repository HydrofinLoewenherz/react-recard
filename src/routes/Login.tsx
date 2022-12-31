import { Box, ButtonGroup, Checkbox, FormControlLabel, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { useStore } from '../store/store'
import { FormButton } from '../components/FormButton'
import { addNewUser, forgetLogin, rememberLogin, userExists } from '../store/user_storage'
import { toSafeCredentials } from '../store/storage'
import { Credentials } from '../types'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import InputAdornment from '@mui/material/InputAdornment'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [stayLoggedIn, setStayLoggedIn] = useState(false)

  const login = useStore(store => store.login)

  const clearInput = (): void => {
    setPassword('')
  }
  const safeCreds = () => toSafeCredentials({ username, password })

  const onSignup = async () => {
    if (await addNewUser(safeCreds())) {
      alert('Created user, you can login now')
    } else {
      alert('User already exists')
    }
    clearInput()
  }
  const onLogin = async () => {
    if (await userExists(safeCreds())) {
      login(safeCreds())
      if (stayLoggedIn) {
        rememberLogin(safeCreds())
      }
    } else {
      alert('Invalid username or password')
    }
    clearInput()
  }
  const onToggleShowPassword = () => setShowPassword(show => !show)

  const validPassword = password !== '' && /\d{2,}/i.test(password)
  const validInput = username !== '' && validPassword

  return (
    <Stack gap={2}>
      <Typography variant='h4' sx={{ mx: 'auto' }}>
        Login
      </Typography>
      <TextField value={username} onChange={({ target }) => setUsername(target.value)} label='Username' />
      <TextField
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label='Password'
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={onToggleShowPassword} edge='end'>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
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
}

type LogoutProps = {
  creds: Credentials
}
const LogoutPage = ({ creds }: LogoutProps) => {
  const logout = useStore(store => store.logout)

  const onLogout = () => {
    logout()
    forgetLogin()
  }

  return (
    <Stack gap={2}>
      <Typography variant='h4' sx={{ mx: 'auto' }}>
        {`Hello, ${creds.username}`}
      </Typography>
      <FormButton onClick={onLogout} fullWidth>
        Logout
      </FormButton>
    </Stack>
  )
}

export const Login = () => {
  const storeCreds = useStore(store => store.credentials)

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center' sx={{ minHeight: '100vh' }}>
      <Grid xs={12} md={6} lg={3}>
        <Box sx={{ p: 2 }}>{(storeCreds !== null && <LogoutPage creds={storeCreds} />) || <LoginPage />}</Box>
      </Grid>
    </Grid>
  )
}
