import { Box, Typography } from '@mui/material'
import { useMemo } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
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
  const findDeck = useStore(store => store.findDeck)
  const deck = useMemo(() => findDeck(params.deckName), [params])

  return (
    <Box>
      <Typography variant='h3'>{deck?.name ?? 'deck not found'}</Typography>
      <Recard question='What is the meaning of life?' answer='$\int_a^b x_{ab} dx = 42 \sum_1^2 ab$ Not latex' />
    </Box>
  )
}
