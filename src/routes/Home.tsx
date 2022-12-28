import {Box, Button, Paper, Stack, TextField, Typography} from '@mui/material'
import { useState } from 'react'
import { FormButton } from '../components'
import { useStore } from '../store/store'
import { Deck } from '../types'
import {Link} from "react-router-dom";

type DeckInfoProps = {
  deck: Deck
}
const DeckInfo = ({ deck }: DeckInfoProps) => {
  const removeDeck = useStore(store => store.removeDeck)

  const onDelete = async () => {
    if (!removeDeck(deck.name)) {
      alert("Couldn't remove deck")
    }
  }

  return (
    <Paper elevation={1}>
      <Typography>{deck.name}</Typography>
      <FormButton onClick={onDelete}>Delete</FormButton>
      <Button variant='outlined' component={Link} to={`/learn/${deck.name}`}>Learn</Button>
    </Paper>
  )
}

const AddDeck = () => {
  const [name, setName] = useState('')

  const setDeck = useStore(store => store.setDeck)
  const saveDecks = useStore(store => store.saveDecks)

  const onSave = async () => {
    if (!setDeck({ name, cards: [] })) {
      alert("Coulnd't save deck")
      return
    }
    if (!(await saveDecks())) {
      alert("Couldn't save decks to storage")
      return
    }
  }

  return (
    <>
      <TextField value={name} onChange={({ target }) => setName(target.value)} />
      <FormButton onClick={onSave}>Save</FormButton>
    </>
  )
}

export const Home = () => {
  const decks = useStore(store => store.decks)

  return (
    <Box>
      <AddDeck />
      <Stack gap={1}>{decks !== null && decks.map((deck, i) => <DeckInfo deck={deck} key={i} />)}</Stack>
    </Box>
  )
}
