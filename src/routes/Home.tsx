import * as API from '../api/recard'
import {useEffect, useState} from "react";
import {Box, List, ListItem, Typography} from "@mui/material";
import {useAuthStore} from "../store/auth";
import {onShake} from "../api/shake";

export const Home = () => {

  const [decks, setDecks] = useState<string[]>([])
  useEffect(() => {
    API.user().then((user) => {
      setDecks(user?.decks || [])
    })
  }, [useAuthStore().username])

  useEffect(() => {
    console.log('starting shake listener')
    const handle = onShake(() => {})
    console.log(`shake listener started`, handle !== false)
    return () => {
      console.log(`shake listener stopped`, handle !== false)
      if (handle !== false) handle()
    }
  }, [])

  return (
    <Box>
      <Typography>
        Home
      </Typography>
      <List>
        // TODO: add button to edit and start learning
        {decks.map(deck =>
          <ListItem>
            {deck}
          </ListItem>
        )}
      </List>
    </Box>
  )
}
