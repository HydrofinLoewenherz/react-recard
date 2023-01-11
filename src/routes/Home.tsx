import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { MoreVert, Delete, Edit } from '@mui/icons-material'
import React, { useMemo, useState } from 'react'
import { useStore } from '../store/store'
import { Deck } from '../types'
import { Link, useNavigate } from 'react-router-dom'
import ExampleDeck from '../assets/seeding/my-first-deck.json'
import { ArgumentAxis, Chart, LineSeries, ValueAxis } from '@devexpress/dx-react-chart-material-ui'
import { ValueAxis as ValueAxisBase } from '@devexpress/dx-react-chart'
import { v4 as uuid } from 'uuid'

const ValueLabel = (props: ValueAxisBase.LabelProps) => {
  const { text } = props
  return <ValueAxis.Label {...props} text={`${text}%`} />
}

type DeckInfoProps = {
  deck: Deck
}
const DeckInfo = ({ deck }: DeckInfoProps) => {
  const removeDeck = useStore(store => store.removeDeck)
  const cardLogs = useStore(store => store.cardLogs)

  const cardIds = useMemo(() => deck.cards.map(c => c.id), [deck])
  const graphData = useMemo(() => {
    const successes: number[] = []
    cardLogs
      .filter(log => log.deckId === deck.id)
      .forEach(log => {
        if (successes.length === 0) {
          successes.push(log.success ? 1 : 0)
        } else {
          const last = successes[successes.length - 1]
          successes.push(last + (log.success ? 1 : 0))
        }
      })
    if (successes.length === 0) {
      successes.push(1)
    }
    return successes.map((res, index) => ({ argument: index + 1, value: Math.round((res / (index + 1)) * 100) }))
  }, [cardIds, cardLogs])

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card>
      <CardHeader
        action={
          <>
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem component={Link} to={`/edit/${deck.id}`}>
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText>Manage</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => removeDeck(deck.id)}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </>
        }
        title={deck.name}
        titleTypographyProps={{ textAlign: 'center', variant: 'h6' }}
      />
      <CardContent>
        <Paper elevation={2}>
          <Chart data={graphData} height={200}>
            <ArgumentAxis />
            <ValueAxis labelComponent={ValueLabel} />
            <LineSeries valueField='value' argumentField='argument' />
          </Chart>
        </Paper>
      </CardContent>
      <CardActions>
        <Button variant='contained' component={Link} to={`/learn/${deck.id}`} sx={{ mx: 'auto' }} aria-label={'learn deck'}>
          Learn Cards
        </Button>
      </CardActions>
    </Card>
  )
}

const CreateDeck = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const setDeck = useStore(store => store.setDeck)
  const saveDecks = useStore(store => store.saveDecks)

  const onSave = async () => {
    const id = uuid()
    if (!setDeck({ id: id, name, cards: [] })) {
      alert("Couldn't save deck")
      return
    }
    if (!(await saveDecks())) {
      alert("Couldn't save decks to storage")
      return
    }
    setName('')
    navigate(`/edit/${id}`)
  }

  const onCancel = () => {
    setName('')
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Stack gap={1}>
        <TextField label={'Deck Name'} value={name} onChange={({ target }) => setName(target.value)} />
        <ButtonGroup>
          <Button fullWidth variant='outlined' onClick={onSave} disabled={name.length < 3} aria-label={'save'}>
            Save
          </Button>
          <Button fullWidth variant='outlined' onClick={onCancel} disabled={name.length === 0} aria-label={'cancel create deck'}>
            Cancel
          </Button>
        </ButtonGroup>
      </Stack>
    </Paper>
  )
}

export const Home = () => {
  const decks = useStore(store => store.decks)
  const setDeck = useStore(store => store.setDeck)

  const seed = () => {
    setDeck(ExampleDeck)
  }

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant='h5' sx={{ mt: 4, mb: 1 }}>
        Create Deck
      </Typography>
      <CreateDeck />

      <Typography variant='h5' sx={{ mt: 4 }}>
        Decks
      </Typography>
      <Stack gap={2} sx={{ mt: 1 }}>
        {decks !== null && decks.map(deck => <DeckInfo deck={deck} key={deck.id} />)}
        {(decks === null || decks.length === 0) && (
          <Paper sx={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', textAlign: 'center', p: 2 }}>
            <Typography sx={{ mb: 2 }}>You have no decks!</Typography>
            <Button variant={'contained'} onClick={seed} aria-label={'add example deck'}>
              Add Example Deck
            </Button>
          </Paper>
        )}
      </Stack>
    </Container>
  )
}
