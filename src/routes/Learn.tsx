import {Box, Button, Container, FormControlLabel, Slide, Switch, Typography} from '@mui/material'
import {LoaderFunction, useLoaderData} from "react-router-dom";
import {useStore} from "../store/store";
import React, {useEffect, useMemo, useState} from "react";
import {Recard} from "../components";
import {onShake, ShakeHandler} from "../api/shake";

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

  const [showCard, setShowCard] = useState(true)
  const [slideDir, setSlideDir] = useState<"left" | "right" | "up">("up")

  let animating = false
  const timeout = (delay: number) => new Promise(res => setTimeout(res, delay))
  const handleShake: ShakeHandler = ({ type }) => {
    console.log('shake', type)
    if (animating) {
      console.log("skipping shake, currently animating")
      return
    }

    if (type !== "shakeRight" && type !== "shakeLeft") {
      console.log("toggle show answer")
      setShowAnswer(v => !v)
      return
    }

    nextCard(type !== "shakeRight")
  }

  const nextCard = (success: boolean) => {
    console.log("next card")
    // TODO log progress
    Promise.resolve()
      .then(async () => animating = true)
      .then(async () => setSlideDir(success ? "right" : "left"))
      .then(async () => setShowCard(false))
      .then(async () => await timeout(200))
      .then(async () => setShowAnswer(false))
      .then(async () => setCardIndex(i => (i + 1) % (deck?.cards.length || 0)))
      .then(async () => await timeout(200))
      .then(async () => setSlideDir("up"))
      .then(async () => setShowCard(true))
      .finally(async () => animating = false)
  }

  useEffect(() => {
    const handle = onShake(handleShake, { magThreshold: 12 })
    if (handle !== false) {
      return () => handle()
    }
  }, [])

  const containerRef = React.useRef(null);

  return (
    <Container
    >
      <Typography variant='h3'>{deck?.name ?? 'deck not found'}</Typography>
      <Box
        sx={{ overflow: "hidden" }}
        ref={containerRef}
      >
        <Slide
          direction={slideDir}
          in={showCard}
          mountOnEnter
          unmountOnExit
        >
          <Box>
            <Recard onClick={() => setShowAnswer(v => !v)} showAnswer={showAnswer} question={card?.question ?? '-'} answer={card?.answer ?? '-'} />
          </Box>
        </Slide>
      </Box>

    </Container>
  )
}
