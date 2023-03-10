import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

import Latex from 'react-latex'
import '../assets/katex.min.css'
import React from 'react'
import { ExpandMore } from '@mui/icons-material'

export type RecardProps = {
  question: string
  answer: string
  displayMode?: boolean
  showAnswer?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const Recard = ({ question, answer, displayMode, showAnswer, onClick }: RecardProps): JSX.Element => {
  return (
    <Accordion expanded={showAnswer} onClick={onClick}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Latex displayMode={displayMode}>{question}</Latex>
      </AccordionSummary>
      <AccordionDetails>
        <Latex displayMode={displayMode}>{answer}</Latex>
      </AccordionDetails>
    </Accordion>
  )
}
