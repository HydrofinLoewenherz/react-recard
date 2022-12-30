import {LogSlice, StateCreator} from "../types/store";
import {v4 as uuid} from "uuid";

export const createLogSlice: StateCreator<LogSlice> = (set, get) => ({
  cardLogs: [],
  log: (cardId: typeof uuid, success: boolean) => {
    const { cardLogs } = get()
    cardLogs.push({
      cardId,
      time: new Date().getTime(),
      success
    })
    set(state => ({ ...state, cardLogs }))
    return true
  }
})
