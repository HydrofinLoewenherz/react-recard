import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useMemo } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import { useStore } from '../store/store'
import { Card } from '../types'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { v4 as uuid } from 'uuid'

export type DeckParams = {
  deckId: string
}

export const deckLoader: LoaderFunction = (args): DeckParams => {
  return args.params as DeckParams
}

interface EditCardProps {
  value: Card
  onChange: (card: Card) => void
  onDelete: () => void
}

const EditCard = ({ value: card, onChange, onDelete }: EditCardProps) => {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={card.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <Box m={2}>
          <Grid container spacing={2} columns={2}>
            <Grid item>
              <TextField label={'Card Name'} value={card.name} onChange={({ target }) => onChange({ ...card, name: target.value })} />
            </Grid>
            <Grid item ml={'auto'} my={'auto'}>
              <Button onClick={onDelete} aria-label={'delete deck'}>
                Delete
              </Button>
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label={'Card Question'}
                value={card.question}
                onChange={({ target }) => onChange({ ...card, question: target.value })}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label={'Card Answer'}
                value={card.answer}
                onChange={({ target }) => onChange({ ...card, answer: target.value })}
              />
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </>
  )
}

export const Edit = () => {
  const params = useLoaderData() as DeckParams
  const findDeck = useStore(store => store.findDeck)
  const setDeck = useStore(store => store.setDeck)
  const saveDecks = useStore(store => store.saveDecks)
  const decks = useStore(store => store.decks)
  const deck = useMemo(() => findDeck(params.deckId), [params, decks])

  const createNew = () => {
    if (deck === null) {
      return
    }
    deck.cards.push({
      id: uuid(),
      name: 'New Card',
      answer: '',
      question: '',
    })
    setDeck(deck)
  }

  const handleCardChange = (card: Card, index: number) => {
    if (deck === null) {
      return
    }
    deck.cards[index] = card
    setDeck(deck)
  }

  const handleCardDelete = (index: number) => {
    if (deck === null) {
      return
    }
    deck.cards.splice(index, 1)
    setDeck(deck)
  }

  return (
    <Container sx={{ my: 4 }}>
      {deck === null ? (
        <Typography variant='h3'>Deck Not found</Typography>
      ) : (
        <Box>
          <Paper>
            <List
              subheader={
                <ListSubheader>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography mt={'auto'} mb={1}>
                      Cards
                    </Typography>
                    <Box>
                      <Button variant={'text'} onClick={saveDecks} aria-label={'save cards'}>
                        Save
                      </Button>
                      <Button variant={'text'} onClick={createNew} aria-label={'create new empty card'}>
                        New
                      </Button>
                    </Box>
                  </Stack>
                </ListSubheader>
              }
            >
              {deck.cards.map((card, index) => (
                <EditCard
                  key={card.id}
                  value={card}
                  onChange={value => handleCardChange(value, index)}
                  onDelete={() => handleCardDelete(index)}
                />
              ))}
            </List>
          </Paper>
        </Box>
      )}
    </Container>
  )
}
