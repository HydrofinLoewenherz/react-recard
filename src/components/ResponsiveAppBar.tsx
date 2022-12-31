import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'
import { useStore } from '../store/store'
import { ListItemIcon, ListItemText } from '@mui/material'
import { AutoMode, Book, DarkMode, Home, LightMode, Login, Person, Settings, Style } from '@mui/icons-material'

const pages = [
  { to: '/', label: 'Home', icon: <Home /> },
  { to: '/logs', label: 'Logs', icon: <Book /> },
]
const settings = [{ to: '/login', label: 'Login / Logout' }]

function ResponsiveAppBar() {
  const toggleTheme = useStore(store => store.toggleThemeMode)
  const theme = useStore(store => store.themeMode)
  const isLoggedIn = useStore(state => state.credentials !== null)

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Style sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Button
            component={Link}
            to='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Recard
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem component={Link} to={page.to} key={page.to} onClick={handleCloseNavMenu}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText>{page.label}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Style sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            noWrap
            component={Link}
            to='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Recard
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(page => (
              <Button
                startIcon={page.icon}
                key={page.to}
                component={Link}
                to={page.to}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 1, color: 'white' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Settings />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem component={Link} key={setting.to} to={setting.to} onClick={handleCloseUserMenu}>
                  <ListItemIcon>{isLoggedIn ? <Person /> : <Login />}</ListItemIcon>
                  <ListItemText>{isLoggedIn ? 'Profile' : 'Login'}</ListItemText>
                </MenuItem>
              ))}

              <MenuItem
                onClick={() => {
                  handleCloseUserMenu()
                  toggleTheme()
                }}
              >
                <ListItemIcon>
                  {theme === 'light' && <DarkMode />}
                  {theme === 'dark' && <AutoMode />}
                  {theme === 'auto' && <LightMode />}
                </ListItemIcon>
                <ListItemText>
                  {theme === 'light' && 'Dark Mode'}
                  {theme === 'dark' && 'Auto Mode'}
                  {theme === 'auto' && 'Light Mode'}
                </ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
