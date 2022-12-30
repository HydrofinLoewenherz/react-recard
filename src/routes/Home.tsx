import {
  Box,
  Button,
  Card, CardActions,
  CardContent, CardHeader,
  Container, IconButton, ListItemIcon, ListItemText, Menu, MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { MoreVert, Delete, Edit } from '@mui/icons-material';
import React, {useMemo} from 'react'
import { useStore } from '../store/store'
import { Deck } from '../types'
import { Link } from "react-router-dom";
import ExampleDeck from "../assets/seeding/my-first-deck.json"
import {ArgumentAxis, Chart, LineSeries, ValueAxis} from "@devexpress/dx-react-chart-material-ui";
import {ValueAxis as ValueAxisBase} from "@devexpress/dx-react-chart";

const ValueLabel = (props: ValueAxisBase.LabelProps) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text}%`}
    />
  );
};

type DeckInfoProps = {
  deck: Deck
}
const DeckInfo = ({ deck }: DeckInfoProps) => {
  const removeDeck = useStore(store => store.removeDeck)
  const cardLogs = useStore(store => store.cardLogs)

  const cardIds = useMemo(() => deck.cards.map(c => c.id), [deck])
  const graphData = useMemo(() => {
    const result: number[] = []
    cardLogs.forEach((log) => {
      if (result.length === 0) {
        result.push(log.success ? 1 : 0)
      } else {
        const last = result[result.length - 1]
        result.push(last + (log.success ? 1 : 0))
      }
    })
    return result.map((res, index) => ({ argument: index, value: Math.round((res / (index + 1)) * 100) }))
  }, [cardIds, cardLogs])

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
                to={`/edit/${deck.id}`}
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
        <Chart
          data={graphData}
        >
          <ArgumentAxis />
          <ValueAxis
            labelComponent={ValueLabel}
          />
          <LineSeries valueField="value" argumentField="argument" />
        </Chart>
      </CardContent>
      <CardActions>
        <Button variant='contained' component={Link} to={`/learn/${deck.id}`}>Learn Cards</Button>
      </CardActions>
    </Card>
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
        {decks !== null && decks.map((deck) => <DeckInfo deck={deck} key={deck.id} />)}
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
