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

  const [isListening, setListening] = useState(false)
  const [shaken, setShaken] = useState(false)
  useEffect(() => {
    console.log('starting shake listener')
    const listening = onShake(() => {
      setShaken(true)
    })
    console.log(`shake listener started`, listening)
    setListening(listening)
  })

  return (
    <Box>
      <pre>
        '{isListening}' '{shaken}'
      </pre>
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
