import type { Admin } from 'types'

type AuthProps = {
  admin?: Admin,
  token: string
}

export const initialAuth = {
  admin: null,
  token: '',
}

export const authKey = 'shiftCareAuth'

const StateLoader = {
  saveAuth: (auth: AuthProps): void => {
    const { token, admin } = auth
    localStorage.setItem(authKey, JSON.stringify({ token, admin }))
  },
  getAuth: (): undefined => {
    const authKeyValue = localStorage.getItem(authKey)
    const { ...auth } = authKeyValue ? JSON.parse(authKeyValue) : {}

    return {
      ...auth
    }
  },
  deleteAuth: (): void => {
    localStorage.removeItem(authKey)
  }
}

export default StateLoader
