import * as CryptoJS from 'crypto-js'
import { isDev } from '../api/mode'
import { RawCredentials, Credentials } from '../types'

export const HexEnc = CryptoJS.enc.Hex
export const Utf8Enc = CryptoJS.enc.Utf8
export const Base64Enc = CryptoJS.enc.Base64
export const HexFmt = CryptoJS.format.Hex
export type WordArray = CryptoJS.lib.WordArray
export type StoreKey = { key: string }

export const AesKeyLen = 256
export const AesIvLen = 128

export const Pbkdf2SaltLen = 128
export const Pbkdf2Iterations = 100

const dbg = isDev()

/**
 * IV that consists of 128 0-bits
 * This should be a random nonce
 */
export const Iv = CryptoJS.lib.WordArray.create([0, 0, 0, 0], AesIvLen / 32)

/**
 * Salt that consists of 128 0-bits
 * This should be a random nonce
 */
export const Salt = CryptoJS.lib.WordArray.create([0, 0, 0, 0], Pbkdf2SaltLen / 32)

export const deriveSecret = ({ username, password }: RawCredentials): WordArray => {
  return CryptoJS.PBKDF2(username + password, Salt, { keySize: AesKeyLen / 32, iterations: Pbkdf2Iterations })
}
export const hash = (data: string): string => {
  return CryptoJS.SHA256(data).toString(Base64Enc)
}
export const toSafeCredentials = (cred: RawCredentials): Credentials => {
  return {
    username: cred.username,
    passwordHash: hash(cred.username + cred.password),
    aesKey: deriveSecret(cred),
  }
}

export const userKey = (key: string, cred: Credentials): StoreKey => {
  const key_ = dbg ? `${cred.username}__${key}` : CryptoJS.SHA256(cred.username + key).toString(Base64Enc)
  return { key: `recard__${key_}` }
}
export const globalKey = (key: string): StoreKey => {
  const key_ = dbg ? `global__${key}` : CryptoJS.SHA256(key).toString(Base64Enc)
  return { key: `recard__${key_}` }
}

export const encrypt = (clearText: string, aesKey: WordArray): string => {
  const bytes = CryptoJS.AES.encrypt(clearText, aesKey, { format: HexFmt, iv: Iv })
  return Base64Enc.stringify(bytes.ciphertext)
}
export const decrypt = (cipherText: string, aesKey: WordArray): string | null => {
  const cipherTextHex = Base64Enc.parse(cipherText).toString(HexEnc)
  const bytes = CryptoJS.AES.decrypt(cipherTextHex, aesKey, { format: HexFmt, iv: Iv })
  return bytes.sigBytes < 0 ? null : bytes.toString(Utf8Enc)
}

export const saveTo = <T>(store: Storage, { key }: StoreKey, value: T, aesKey?: WordArray) => {
  const json = JSON.stringify(value)
  store.setItem(key, aesKey && !dbg ? encrypt(json, aesKey) : json)
}

export const removeFrom = (store: Storage, { key }: StoreKey): boolean => {
  if (store.getItem(key) === null) {
    return false
  }
  store.removeItem(key)
  return true
}

export const loadFrom = <T>(store: Storage, { key }: StoreKey, aesKey?: WordArray): T | null => {
  const item = store.getItem(key)
  if (item === null) return null

  const clearText = aesKey && !dbg ? decrypt(item, aesKey) : item
  if (clearText === null) return null

  try {
    return JSON.parse(clearText)
  } catch (e) {
    return null
  }
}

export namespace Session {
  export const save = <T>(key: StoreKey, value: T, aesKey?: WordArray) => saveTo(sessionStorage, key, value, aesKey)
  export const remove = (key: StoreKey) => removeFrom(sessionStorage, key)
  export const load = <T>(key: StoreKey, aesKey?: WordArray) => loadFrom<T>(sessionStorage, key, aesKey)
}
export namespace Local {
  export const save = <T>(key: StoreKey, value: T, aesKey?: WordArray) => saveTo(localStorage, key, value, aesKey)
  export const remove = (key: StoreKey) => removeFrom(localStorage, key)
  export const load = <T>(key: StoreKey, aesKey?: WordArray) => loadFrom<T>(localStorage, key, aesKey)
}
