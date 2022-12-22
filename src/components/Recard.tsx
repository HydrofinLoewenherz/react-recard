import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

export type RecardProps = {
  question: string
  answer: string
}

export const Recard = ({ question, answer }: RecardProps): JSX.Element => {
  return (
    <Accordion>
      <AccordionSummary>{question}</AccordionSummary>
      <AccordionDetails>{answer}</AccordionDetails>
    </Accordion>
  )
}
