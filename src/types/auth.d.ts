import { WordArray } from '../store/storage'

export type RawCredentials = {
  username: string
  password: string
}

export type Credentials = {
  username: string
  passwordHash: string
  aesKey: WordArray
}
