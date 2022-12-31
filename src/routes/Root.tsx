import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../components'

export const Root = (): JSX.Element => {
  return (
    <Box id={'recard-root'}>
      <Header />

      {/* This where the child-elements are placed */}
      <Outlet />

      <Footer />
    </Box>
  )
}
