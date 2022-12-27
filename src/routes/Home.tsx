import { Box, Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { FormButton } from '../components'
import { Recard } from '../components/Recard'
import { useStore } from '../store/store'
import { Deck } from '../types'

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
  const [name, setName] = useState('')

  const decks = useStore(store => store.decks)
  const creds = useStore(store => store.credentials)

  return (
    <Box>
      {(creds === null && <Typography>Please log in first</Typography>) || (
        <>
          <AddDeck />
          <Stack gap={1}>{decks !== null && decks.map(deck => <DeckInfo deck={deck} />)}</Stack>
        </>
      )}
    </Box>
  )
}
