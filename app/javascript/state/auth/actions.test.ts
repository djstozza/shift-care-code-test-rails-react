import * as actions from './actions'

const email = 'admin@example.com'
const password = 'password'

describe('Auth actions', () => {
  test('initializeAuth', () => {
    expect(actions.initializeAuth()).toEqual({ type: actions.INITIALIZE_AUTH })
  })

  test('logIn', () => {
    const admin = { email, password }
    expect(actions.logIn({ admin })).toEqual({ type: actions.API_SESSIONS_CREATE, admin })
  })

  test('updateSession', () => {
    expect(actions.updateSession()).toEqual({ type: actions.API_SESSIONS_UPDATE })
  })

  test('logOut', () => {
    expect(actions.logOut()).toEqual({ type: actions.LOG_OUT })
  })
})
