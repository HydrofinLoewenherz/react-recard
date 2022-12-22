import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

import Latex from 'react-latex'
import '../assets/katex.min.css'

export type RecardProps = {
  question: string
  answer: string
  displayMode?: boolean
}

export const Recard = ({ question, answer, displayMode }: RecardProps): JSX.Element => {
  return (
    <Accordion>
      <AccordionSummary>{question}</AccordionSummary>
      <AccordionDetails>
        <Latex displayMode={displayMode}>{answer}</Latex>
      </AccordionDetails>
    </Accordion>
  )
}
