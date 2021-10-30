export const INITIALIZE_AUTH = 'INITIALIZE_AUTH'
export const API_SESSIONS_CREATE = 'API_SESSIONS_CREATE'
export const API_SESSIONS_UPDATE = 'API_SESSIONS_UPDATE'
export const LOG_OUT = 'LOG_OUT'

type LogInProps = {
  admin: { email: string, password: string }
}

export const initializeAuth = () => ({ type: INITIALIZE_AUTH })
export const logIn = ({ admin }: LogInProps) => ({ type: API_SESSIONS_CREATE, admin })
export const updateSession = () => ({ type: API_SESSIONS_UPDATE })
export const logOut = () => ({ type: LOG_OUT })
