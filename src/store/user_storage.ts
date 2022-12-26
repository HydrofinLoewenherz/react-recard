import { RawCredentials, Credentials } from '../types'
import { globalKey, Local, hash } from './storage'
import * as DeckAPI from '../api/recard'

type User = { username: string; password: string }
type UserList = User[]

const userListKey = globalKey('user-list')
const loginKey = globalKey('login')

export const rememberLogin = (cred: Credentials): void => {
  Local.save(loginKey, cred)
}
export const recallLogin = (): Credentials | null => {
  return Local.load(loginKey)
}
export const forgetLogin = (): void => {
  Local.remove(globalKey('login'))
}

export const userExists = async (cred: Credentials): Promise<boolean> => {
  const userList = Local.load<UserList>(userListKey)
  if (userList === null) return false

  const hash_ = hash(cred.username)
  return userList.findIndex(user => user.username === hash_ && user.password === cred.passwordHash) !== -1
}

export const addNewUser = async (cred: Credentials): Promise<boolean> => {
  const hash_ = hash(cred.username)

  let userList = Local.load<UserList>(userListKey)
  if (userList === null) {
    Local.save<UserList>(userListKey, [])
    userList = []
  } else if (userList.findIndex(user => user.username === hash_) !== -1) {
    return false
  }

  userList.push({ username: hash_, password: cred.passwordHash })
  Local.save(userListKey, userList)
  await DeckAPI.setDeckList([], cred)
  return true
}

export const deleteUser = async (cred: Credentials): Promise<boolean> => {
  const userList = Local.load<UserList>(userListKey)
  if (userList === null) return false

  const hash_ = hash(cred.username)
  const pos = userList.findIndex(user => user.username === hash_)
  if (pos === -1) return false

  userList.splice(pos, 1)
  Local.save(userListKey, userList)
  return true
}
