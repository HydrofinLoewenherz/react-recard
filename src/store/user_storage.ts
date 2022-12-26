import { RawCredentials, Credentials } from '../types'
import { globalKey, Local, hash } from './storage'

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

export const userExists = (cred: Credentials): boolean => {
  const userList = Local.load<UserList>(userListKey)
  if (userList === null) return false

  const hash_ = hash(cred.username)
  return userList.findIndex(user => user.username === hash_ && user.password === cred.passwordHash) !== -1
}

export const addNewUser = (cred: Credentials): boolean => {
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
  return true
}

export const deleteUser = (cred: Credentials): boolean => {
  const userList = Local.load<UserList>(userListKey)
  if (userList === null) return false

  const hash_ = hash(cred.username)
  const pos = userList.findIndex(user => user.username === hash_)
  if (pos === -1) return false

  userList.splice(pos, 1)
  Local.save(userListKey, userList)
  return true
}
