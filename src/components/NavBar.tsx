import { AppBar, Box, Button, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'

const routes = [
  ['/', 'Home'],
  ['/learn', 'Learn'],
  ['/login', 'Login'],
]

type NavBarProps = {}
export const NavBar = (props: NavBarProps) => {
  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <Box sx={{ display: 'flex', columnGap: 1 }}>
            {routes.map(route => (
              <Button variant='outlined' component={Link} to={route[0]}>
                {route[1]}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
