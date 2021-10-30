import { expectSaga } from 'redux-saga-test-plan'
import { decamelizeKeys } from 'humps'

import authSagas, * as sagas from './sagas'
import * as actions from './actions'
import { requestActions } from 'state/request'
import {
  API_URL,
  API_SESSIONS_PATH,
  LOGIN_URL,
  JOBS_URL
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import history from 'state/history'
import { authKey } from 'utilities/stateLoader'

describe('Auth sagas', () => {
  test('logIn', () => {
    const admin = { email: 'admin@example.com', password: 'password' }

    expectSaga(authSagas, actions.logIn({ admin }))
      .put({
        type: requestActions.UNAUTHED_REQUEST,
        method: 'POST',
        url: `${API_URL}${API_SESSIONS_PATH}`,
        body: { admin: decamelizeKeys(admin) },
        successAction: success(actions.API_SESSIONS_CREATE),
        failureAction: failure(actions.API_SESSIONS_CREATE)
      })
      .dispatch({ type: actions.API_SESSIONS_CREATE, admin })
      .run()
  })

  test(`onAuthed - ${success(actions.API_SESSIONS_CREATE)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.onAuthed)
      .dispatch({ type: success(actions.API_SESSIONS_CREATE) })
      .run()
    expect(historyReplaceSpy).toHaveBeenCalledWith(JOBS_URL)
  })

  test('updateSession', () => {
    expectSaga(sagas.updateSession, actions.updateSession())
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'PUT',
        url: `${API_URL}${API_SESSIONS_PATH}`,
        body: {},
        successAction: success(actions.API_SESSIONS_UPDATE),
        failureAction: failure(actions.API_SESSIONS_UPDATE)
      })
      .dispatch({ type: actions.API_SESSIONS_UPDATE })
      .run()
  })

  test(`logOut - ${actions.LOG_OUT}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')
    jest.spyOn(window.localStorage.__proto__, 'removeItem')

    expectSaga(sagas.logOut)
      .dispatch({ type: actions.LOG_OUT })
      .run()
    expect(historyReplaceSpy).toHaveBeenCalledWith(LOGIN_URL)
    expect(localStorage.removeItem).toHaveBeenCalledWith(authKey)
  })

  test(`logOut - ${failure(actions.API_SESSIONS_UPDATE)}`, () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')
    jest.spyOn(window.localStorage.__proto__, 'removeItem')

    expectSaga(sagas.logOut)
      .dispatch({ type: failure(actions.API_SESSIONS_UPDATE) })
      .run()
    expect(historyReplaceSpy).toHaveBeenCalledWith(LOGIN_URL)
    expect(localStorage.removeItem).toHaveBeenCalledWith(authKey)
  })
})
