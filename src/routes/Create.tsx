import {Button, Container, Stack, TextField, Typography} from '@mui/material'
import React, {useState} from 'react'
import {FormButton} from '../components'
import { useStore } from '../store/store'
import {Link, useNavigate} from "react-router-dom";

export const Create = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const setDeck = useStore(store => store.setDeck)
  const saveDecks = useStore(store => store.saveDecks)

  const onSave = async () => {
    if (!setDeck({ name, cards: [] })) {
      alert("Couldn't save deck")
      return
    }
    if (!(await saveDecks())) {
      alert("Couldn't save decks to storage")
      return
    }
    navigate(`/edit/${name}`)
  }

  return (
    <Container
      sx={{ my: 4 }}
    >
      <Stack gap={2}>
        <TextField label={"Deck Name"} value={name} onChange={({ target }) => setName(target.value)} />
        <TextField label={"Deck Description"} value={name} onChange={({ target }) => setName(target.value)} />
        <Typography>
          -- Other Settings --
        </Typography>
        <Stack gap={1} direction={"row"}>
          <FormButton
            variant={'contained'}
            onClick={onSave}
          >
            Save
          </FormButton>
          <Button
            component={Link}
            to={`/`}
            variant='outlined'
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
