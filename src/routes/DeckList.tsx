import { Box, Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { FormButton } from '../components'
import { Recard } from '../components/Recard'
import { useStore } from '../store/store'
import { Deck } from '../types'

type ListEntryProps = {
  deck: Deck
}
const ListEntry = ({ deck }: ListEntryProps) => {
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

export const DeckList = () => {
  const [name, setName] = useState('')

  const decks = useStore(store => store.decks)
  const setDeck = useStore(store => store.setDeck)
  const saveDecks = useStore(store => store.saveDecks)
  const creds = useStore(store => store.credentials)

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
    <Box>
      {(creds === null && <Typography>Please log in first</Typography>) || (
        <>
          <TextField value={name} onChange={({ target }) => setName(target.value)} />
          <FormButton onClick={onSave}>Save</FormButton>
          <Stack gap={1}>{decks !== null && decks.map(deck => <ListEntry deck={deck} />)}</Stack>
        </>
      )}
    </Box>
  )
}
