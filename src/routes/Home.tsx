import {
  Button,
  Card, CardActions,
  CardContent, CardHeader,
  Container, IconButton, ListItemIcon, ListItemText, Menu, MenuItem,
  Stack,
  TextField,
} from '@mui/material'
import { MoreVert, Delete, Edit } from '@mui/icons-material';
import React, { useState } from 'react'
import { FormButton } from '../components'
import { useStore } from '../store/store'
import { Deck } from '../types'
import { Link } from "react-router-dom";

type DeckInfoProps = {
  deck: Deck
}
const DeckInfo = ({ deck }: DeckInfoProps) => {
  const removeDeck = useStore(store => store.removeDeck)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardHeader
        action={
          <>
            <IconButton
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                component={Link}
                to={`/deck/${deck.name}`}
              >
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText>
                  Manage
                </ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => removeDeck(deck.name)}
              >
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText>
                  Delete
                </ListItemText>
              </MenuItem>
            </Menu>
          </>
        }
        title={deck.name}
      />
      <CardContent>
        Stats!
      </CardContent>
      <CardActions>
        <Button variant='outlined' component={Link} to={`/learn/${deck.name}`}>Learn</Button>
      </CardActions>
    </Card>
  )
}

const AddDeck = () => {
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
    <Container>
      <AddDeck />
      <Stack gap={1}>
        {decks !== null && decks.map((deck, i) => <DeckInfo deck={deck} key={i} />)}
      </Stack>
    </Container>
  )
}
