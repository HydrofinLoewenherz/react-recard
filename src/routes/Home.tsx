import * as API from '../api/recard'
import {useEffect, useState} from "react";
import {Box, List, ListItem, Typography} from "@mui/material";
import {useAuthStore} from "../store/auth";

export const Home = () => {

  const [decks, setDecks] = useState<string[]>([])
  useEffect(() => {
    API.user().then((user) => {
      setDecks(() => user?.decks || [])
    })
  }, [useAuthStore().username])

  return (
    <Box>
      <Typography>
        Home
      </Typography>
      <List>
        {decks.map(deck =>
          <ListItem>
            {deck}
          </ListItem>
        )}
      </List>
    </Box>
  )
}
