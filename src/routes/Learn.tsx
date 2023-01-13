import { Paper, Box, Button, ButtonGroup, Container, LinearProgress, Slide, Typography } from '@mui/material'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import { useStore } from '../store/store'
import React, { useEffect, useMemo, useState } from 'react'
import { Recard } from '../components'
import { onShake, ShakeHandler } from '../api/shake'
import { useSwipeable } from 'react-swipeable'
import { Check, Clear } from '@mui/icons-material'

export type LearnParams = {
  deckId: string
}

export const learnLoader: LoaderFunction = (args): LearnParams => {
  return args.params as LearnParams
}

export const Learn = () => {
  const params = useLoaderData() as LearnParams
  const findDeck = useStore(store => store.findDeck)
  const log = useStore(store => store.log)
  const decks = useStore(store => store.decks)
  const updateCardStats = useStore(store => store.updateCardStats)

  const [cardIndex, setCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showCard, setShowCard] = useState(true)
  const [slideDir, setSlideDir] = useState<'left' | 'right' | 'up'>('up')

  const slideContainerRef = React.useRef(null)

  const deck = useMemo(() => findDeck(params.deckId), [params, decks])
  const card = useMemo(() => deck?.cards[cardIndex] || null, [deck, cardIndex])

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
    if (type !== 'shakeRight' && type !== 'shakeLeft') {
      // toggle show answer
      setShowAnswer(v => !v)
      return
    }
    nextCard(type === 'shakeRight')
  }

  // swipe event listener (https://github.com/FormidableLabs/react-swipeable)
  const handlers = useSwipeable({
    onSwiped: eventData => {
      if (eventData.dir !== 'Left' && eventData.dir !== 'Right') {
        return
      }
      nextCard(eventData.dir === 'Right')
    },
  })

  const timeout = (delay: number) => new Promise(res => setTimeout(res, delay))
  // shows the next card with a swipe animation
  // while the animation is running, no next card can be shown
  const nextCard = (success: boolean) => {
    if (animating) {
      return
    }
    if (deck !== null && card !== null) {
      log(deck.id, card.id, success)
      updateCardStats(card.id, stats => {
        if (success) {
          stats.correctCount += 1
        } else {
          stats.wrongCount += 1
        }
      })
    }
    Promise.resolve()
      .then(async () => (animating = true))
      .then(async () => setSlideDir(success ? 'left' : 'right'))
      .then(async () => setShowCard(false))
      .then(async () => await timeout(200))
      .then(async () => setShowAnswer(false))
      .then(async () => setCardIndex(i => (i + 1) % (deck?.cards.length || 0)))
      .then(async () => await timeout(200))
      .then(async () => setSlideDir('up'))
      .then(async () => setShowCard(true))
      .then(async () => await timeout(200))
      .finally(async () => (animating = false))
  }

  return (
    <Container {...handlers} sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Typography variant='h4'>
          {deck?.name ?? 'deck not found'} – {card?.name ?? 'name not found'}
        </Typography>
        <Typography variant='body1' sx={{ mt: 'auto' }}>
          {deck !== null && `${Math.min(cardIndex + 1, deck.cards.length)}/${deck.cards.length}`}
        </Typography>
      </Box>
      {deck !== null && (
        <LinearProgress variant='determinate' value={(Math.min(cardIndex + 1, deck.cards.length) / deck.cards.length) * 100} />
      )}
      <Paper>
        <Box sx={{ overflow: 'hidden', mt: 4 }} ref={slideContainerRef}>
          <Slide direction={slideDir} in={showCard}>
            <Box>
              <Recard
                onClick={() => setShowAnswer(v => !v)}
                showAnswer={showAnswer}
                question={card?.question ?? '-'}
                answer={card?.answer ?? '-'}
              />
            </Box>
          </Slide>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <ButtonGroup>
          <Button onClick={() => nextCard(false)} aria-label={'I had the wrong answer'} title={'I had the wrong answer'}>
            <Clear />
          </Button>
          <Button onClick={() => setShowAnswer(v => !v)} aria-label={'show me the answer'} title={'show me the answer'}>
            {`${showAnswer ? 'Hide' : 'Show'} Answer`}
          </Button>
          <Button onClick={() => nextCard(true)} aria-label={'I had the correct answer'} title={'I had the correct answer'}>
            <Check />
          </Button>
        </ButtonGroup>
      </Box>

      <Typography sx={{ textAlign: 'center', mt: 6, opacity: 0.6 }}>
        {'Swipe or shake to the left or right to get the next card.' +
          " Left meaning, that you didn't know the answer and right that you did know it."}
      </Typography>
    </Container>
  )
}
