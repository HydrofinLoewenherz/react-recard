import { Container, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper } from '@mui/material'
import React, { useMemo } from 'react'
import { useStore } from '../store/store'
import { CardLog } from '../types/log'
import { Clear, Done } from '@mui/icons-material'

const LogItem = ({ deckId, cardId, time, success }: CardLog) => {
  const findDeck = useStore(store => store.findDeck)
  const deckName = useMemo(() => findDeck(deckId)?.name, [deckId])
  const cardName = useMemo(() => findDeck(deckId)?.cards.find(c => c.id === cardId)?.name, [deckId, cardId])

  return (
    <ListItem>
      <ListItemAvatar>
        {success ? (
          <Avatar sx={{ bgcolor: 'green' }}>
            <Done />
          </Avatar>
        ) : (
          <Avatar>
            <Clear />
          </Avatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={`${deckName || deckId} – ${cardName || cardId}`}
        secondary={new Date(time).toLocaleDateString() + ' ' + new Date(time).toLocaleTimeString()}
      ></ListItemText>
    </ListItem>
  )
}

export const Log = () => {
  const cardLogs = useStore(store => store.cardLogs)

  return (
    <Container sx={{ my: 4 }}>
      <Paper>
        <List>
          {cardLogs.map((log, i) => (
            <LogItem {...log} key={i}></LogItem>
          ))}
          {cardLogs.length !== 0 ? undefined : (
            <ListItem>
              <ListItemText>You currently have no logs</ListItemText>
            </ListItem>
          )}
        </List>
      </Paper>
    </Container>
  )
}
