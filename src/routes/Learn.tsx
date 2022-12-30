import {Box, Button, ButtonGroup, Container, Slide, Typography} from '@mui/material'
import {LoaderFunction, useLoaderData} from "react-router-dom";
import {useStore} from "../store/store";
import React, {useEffect, useMemo, useState} from "react";
import {Recard} from "../components";
import {onShake, ShakeHandler} from "../api/shake";
import {useSwipeable} from "react-swipeable";

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
  const slideContainerRef = React.useRef(null);
  let animating = false

  // shake event listener
  useEffect(() => {
    const handle = onShake(handleShake, { magThreshold: 12 })
    if (handle !== false) {
      return () => handle()
    }
  }, [])
  const handleShake: ShakeHandler = ({ type }) => {
    if (animating) {
      return
    }
    if (type !== "shakeRight" && type !== "shakeLeft") {
      // toggle show answer
      setShowAnswer(v => !v)
      return
    }
    nextCard(type === "shakeRight")
  }

  // swipe event listener (https://github.com/FormidableLabs/react-swipeable)
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir !== "Left" && eventData.dir !== "Right") {
        return
      }
      nextCard(eventData.dir === "Right")
    }
  });

  const timeout = (delay: number) => new Promise(res => setTimeout(res, delay))
  // shows the next card with a swipe animation
  // while the animation is running, no next card can be shown
  const nextCard = (success: boolean) => {
    if (animating) {
      return
    }
    // TODO log progress
    Promise.resolve()
      .then(async () => animating = true)
      .then(async () => setSlideDir(success ? "left" : "right"))
      .then(async () => setShowCard(false))
      .then(async () => await timeout(200))
      .then(async () => setShowAnswer(false))
      .then(async () => setCardIndex(i => (i + 1) % (deck?.cards.length || 0)))
      .then(async () => await timeout(200))
      .then(async () => setSlideDir("up"))
      .then(async () => setShowCard(true))
      .then(async () => await timeout(200))
      .finally(async () => animating = false)
  }

  return (
    <Container
      {...handlers}
      sx={{mt: 4}}
    >
      <Typography variant='h3'>{deck?.name ?? 'deck not found'}</Typography>
      <Box
        sx={{ overflow: "hidden", mt: 4 }}
        ref={slideContainerRef}
      >
        <Slide
          direction={slideDir}
          in={showCard}
        >
          <Box>
            <Recard onClick={() => setShowAnswer(v => !v)} showAnswer={showAnswer} question={card?.question ?? '-'} answer={card?.answer ?? '-'} />
          </Box>
        </Slide>
      </Box>

      <Box
        sx={{display: "flex", justifyContent: "center", mt: 2}}
      >
        <ButtonGroup>
          <Button onClick={() => nextCard(false)}>What's that?</Button>
          <Button onClick={() => nextCard(true)}>I know that!</Button>
        </ButtonGroup>
      </Box>
    </Container>
  )
}
