import { Box, Button, ButtonGroup, FormControl, Input, Stack, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export const Login = () => {
  const usernameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()

  const [error, setError] = useState<string | null>(null)

  const getInput = (): [string, string] => {
    return [usernameRef!.current!.value, passwordRef!.current!.value]
  }
  const clearInput = (): void => {
    usernameRef!.current!.value = ''
    passwordRef!.current!.value = ''
  }

  const onSignup = () => {
    clearInput()
    setError("Couldn't sign up")
  }
  const onLogin = () => {
    clearInput()
    setError('Invalid user')
  }

  const headerText = error === null ? 'Login' : `Login (Error: ${error})`

  return (
    <Box>
      <h1>{headerText}</h1>
      <Stack gap={1}>
        <TextField inputRef={usernameRef} label='Username' />
        <TextField inputRef={passwordRef} label='Password' />
        // TODO: Disable buttons when inputs are empty
        <ButtonGroup>
          <Button onClick={onLogin} fullWidth>
            Login
          </Button>
          <Button onClick={onSignup} fullWidth>
            Signup
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  )
}
