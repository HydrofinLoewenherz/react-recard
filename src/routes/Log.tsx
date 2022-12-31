import { Container, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material'
import React from 'react'
import { useStore } from '../store/store'
import { Clear, Done } from '@mui/icons-material'

export const Log = () => {
  const cardLogs = useStore(store => store.cardLogs)

  return (
    <Container>
      <Paper sx={{ my: 4 }}>
        <List>
          {cardLogs.map((log, i) => (
            <ListItem key={i}>
              <ListItemText>
                <Typography color={'lightblue'} component={'span'}>
                  {log.cardId}
                </Typography>
                <Typography component={'span'}> at </Typography>
                <Typography color={'lightblue'} component={'span'}>
                  {new Date(log.time).toDateString()}
                </Typography>
              </ListItemText>
              <ListItemIcon>{log.success ? <Done /> : <Clear />}</ListItemIcon>
            </ListItem>
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
