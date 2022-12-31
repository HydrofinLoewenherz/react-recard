import { v4 as uuid } from 'uuid'

export type CardLog = {
  deckId: uuid
  cardId: uuid
  time: number
  success: boolean
}
