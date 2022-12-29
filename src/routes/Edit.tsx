import {Box, Container, Paper, Stack, TextField, Typography} from '@mui/material'
import React, { useMemo } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import {FormButton, Recard} from '../components'
import { useStore } from '../store/store'
import { blue } from '@mui/material/colors';

export type DeckParams = {
  deckName: string
}

export const deckLoader: LoaderFunction = (args): DeckParams => {
  console.log(args)
  return args.params as DeckParams
}

export const Edit = () => {
  const params = useLoaderData() as DeckParams
  const findDeck = useStore(store => store.findDeck)
  const deck = useMemo(() => findDeck(params.deckName), [params])

  return (
    <Container
      sx={{ my: 4 }}
    >
      {
        deck === null ? <Typography variant='h3'>Deck Not found</Typography> :
          <Box>
            <Typography variant='h3'>Edit Deck <Typography variant='h3' component={"span"} color={blue[200]}>{deck.name}</Typography></Typography>

            <Typography variant={'h4'} sx={{ mt: 4, mb: 1 }}>Create Card</Typography>
            <Paper sx={{ p: 2 }}>
              <Stack gap={2}>
                <TextField label={"Card Name"} />
                <TextField label={"Card Question"} />
                <TextField label={"Card Answer"} />
                <Stack direction={"row"} >
                  <FormButton>Save</FormButton>
                </Stack>
              </Stack>
            </Paper>

            <Typography variant={'h4'} sx={{ mt: 4, mb: 1 }}>Cards</Typography>
            <Stack>
              { deck.cards.map(card => <Recard question={card.question} answer={card.answer} />) }
              { deck.cards.length > 0 || <Paper sx={{ p: 1 }}><Typography>No Decks found</Typography></Paper> }
            </Stack>
          </Box>
      }
    </Container>
  )
}
