import * as CryptoJS from 'crypto-js'
import { Credentials } from '../types'

const HexEnc = CryptoJS.enc.Hex
const Utf8Enc = CryptoJS.enc.Utf8
const Base64Enc = CryptoJS.enc.Base64
const HexFmt = CryptoJS.format.Hex
type WordArray = CryptoJS.lib.WordArray
export type StoreKey = { key: string }

/**
 * IV that consists of 128 0-bits
 */
const Iv = CryptoJS.lib.WordArray.create([0, 0, 0, 0], 16)

/**
 * Salt that consists of 128 0-bits
 */
const Salt = CryptoJS.lib.WordArray.create([0, 0, 0, 0], 16)

export const deriveSecret = ({ username, password }: Credentials): WordArray => {
  return CryptoJS.PBKDF2(username + password, Salt, { keySize: 8, iterations: 100 })
}

export const userKey = (key: string, cred?: Credentials): StoreKey => ({
  key: cred ? CryptoJS.SHA256(cred.username + cred.password + key).toString(Base64Enc) : key,
})

export const encrypt = (clearText: string, cred: Credentials): string => {
  const bytes = CryptoJS.AES.encrypt(clearText, deriveSecret(cred), { format: HexFmt, iv: Iv })
  return Base64Enc.stringify(bytes.ciphertext)
}
export const decrypt = (cipherText: string, cred: Credentials): string | null => {
  const cipherTextHex = Base64Enc.parse(cipherText).toString(HexEnc)
  const bytes = CryptoJS.AES.decrypt(cipherTextHex, deriveSecret(cred), { format: HexFmt, iv: Iv })
  return bytes.sigBytes < 0 ? null : bytes.toString(Utf8Enc)
}

export const saveTo = <T>(store: Storage, { key }: StoreKey, value: T, cred?: Credentials) => {
  const json = JSON.stringify(value)
  store.setItem(key, cred ? encrypt(json, cred) : json)
}

export const removeFrom = (store: Storage, { key }: StoreKey, cred?: Credentials): boolean => {
  if (store.getItem(key) === null) return false
  store.removeItem(key)
  return true
}

export const loadFrom = <T>(store: Storage, { key }: StoreKey, cred?: Credentials): T | null => {
  const item = store.getItem(key)
  if (item === null) return null
  if (cred === undefined) return JSON.parse(item)
  const clearText = decrypt(item, cred)
  if (clearText === null) return null
  return JSON.parse(clearText)
}

export namespace Session {
  export const save = <T>(key: StoreKey, value: T, cred?: Credentials) => saveTo(sessionStorage, key, value, cred)
  export const remove = (key: StoreKey, cred?: Credentials) => removeFrom(sessionStorage, key, cred)
  export const load = <T>(key: StoreKey, cred?: Credentials) => loadFrom<T>(sessionStorage, key, cred)
}
export namespace Local {
  export const save = <T>(key: StoreKey, value: T, cred?: Credentials) => saveTo(localStorage, key, value, cred)
  export const remove = (key: StoreKey, cred?: Credentials) => removeFrom(localStorage, key, cred)
  export const load = <T>(key: StoreKey, cred?: Credentials) => loadFrom<T>(localStorage, key, cred)
}
