import { Box } from '@mui/material'
import { Recard } from '../components/Recard'

export const Deck = () => {
  return (
    <Box>
      <Recard question='What is the meaning of life?' answer='$\int_a^b x_{ab} dx = 42 \sum_1^2 ab$ Not latex' />
    </Box>
  )
}
