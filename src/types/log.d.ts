import {v4 as uuid} from "uuid"

export type CardLog = {
  cardId: uuid,
  time: number,
  success: boolean
}
