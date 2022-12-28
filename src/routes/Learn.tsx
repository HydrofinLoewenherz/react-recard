import {Box, Typography} from '@mui/material'
import {LoaderFunction, useLoaderData} from "react-router-dom";
import {useStore} from "../store/store";
import {useEffect, useMemo, useState} from "react";
import {Recard} from "../components";
import {onShake} from "../api/shake";

export type LearnParams = {
  deckName: string
}

export const learnLoader: LoaderFunction = (args): LearnParams => {
  return args.params as LearnParams
}

export const Learn = () => {
  const params = useLoaderData() as LearnParams
  const findDeck = useStore(store => store.findDeck)

  const deck = useMemo(() => findDeck(params.deckName), [params])
  const [cardIndex, setCardIndex] = useState(0)
  const card = useMemo(() => deck?.cards[cardIndex] || null, [deck, cardIndex])
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    const handle = onShake(({ magnitude, type }) => {
      console.log('shake', type)

      if (!showAnswer) {
        setShowAnswer(true)
        return
      }

      if (magnitude > 20) {
        // TODO save success or fail
        setCardIndex(i => i + 1)
      }
    })

    if (handle !== false) {
      return () => handle()
    }
  }, [])

  return (
    <Box>
      <Typography variant='h3'>{deck?.name ?? 'deck not found'}</Typography>
      <Recard onClick={() => setShowAnswer(v => !v)} showAnswer={showAnswer} question={card?.question ?? '-'} answer={card?.answer ?? '-'} />
    </Box>
  )
}
