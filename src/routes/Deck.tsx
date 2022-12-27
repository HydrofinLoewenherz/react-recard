import { Box, Typography } from '@mui/material'
import { LoaderFunction, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { Recard } from '../components/Recard'
import { useStore } from '../store/store'

export type DeckParams = {
  deckName: string
}

export const deckLoader: LoaderFunction = (args): DeckParams => {
  console.log(args)
  return args.params as DeckParams
}

export const Deck = () => {
  const params = useLoaderData() as DeckParams
  console.log(params)
  const findDeck = useStore(store => store.findDeck)

  return (
    <Box>
      <Typography variant='h3'>{params.deckName}</Typography>
      <Recard question='What is the meaning of life?' answer='$\int_a^b x_{ab} dx = 42 \sum_1^2 ab$ Not latex' />
    </Box>
  )
}
