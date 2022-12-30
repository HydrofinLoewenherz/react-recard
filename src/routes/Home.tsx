import {
  Box,
  Button,
  Card, CardActions,
  CardContent, CardHeader,
  Container, IconButton, ListItemIcon, ListItemText, Menu, MenuItem,
  Stack,
  TextField, Typography,
} from '@mui/material'
import { MoreVert, Delete, Edit } from '@mui/icons-material';
import React, { useState } from 'react'
import { FormButton } from '../components'
import { useStore } from '../store/store'
import { Deck } from '../types'
import { Link } from "react-router-dom";
import ExampleDeck from "../assets/seeding/my-first-deck.json"

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
                to={`/edit/${deck.name}`}
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
        -- Deck Stats with Graphs --
      </CardContent>
      <CardActions>
        <Button variant='contained' component={Link} to={`/learn/${deck.name}`}>Learn Cards</Button>
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
  const setDeck = useStore(store => store.setDeck)

  const seed = () => {
    setDeck(ExampleDeck)
  }

  return (
    <Container
      sx={{ my: 4 }}
    >
      <Button
        sx={{ m: 1, ml: 'auto' }}
        component={Link}
        to={`/create`}
        variant='outlined'
      >
        Create Deck
      </Button>
      <Stack gap={1}>
        {decks !== null && decks.map((deck, i) => <DeckInfo deck={deck} key={i} />)}
        {!(decks === null || decks.length === 0) ?  '' :
          <Box
            sx={{ display: "flex", flexFlow: "column", justifyContent: "center" }}
          >
            <Typography>You have no decks</Typography>
            <Button onClick={seed}>Add Example Deck</Button>
          </Box>
        }
      </Stack>
    </Container>
  )
}
