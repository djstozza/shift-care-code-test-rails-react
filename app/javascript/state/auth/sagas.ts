import { put, takeLatest, takeEvery, all } from 'redux-saga/effects'
import { decamelizeKeys } from 'humps'

import {
  API_URL,
  API_SESSIONS_PATH,
  LOGIN_URL,
  JOBS_URL
} from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'
import StateLoader from 'utilities/stateLoader'

export function * logIn (action) : Generator<any, any, any> {
  const { admin } = action
  const url = `${API_URL}${API_SESSIONS_PATH}`

  yield put({
    type: requestActions.UNAUTHED_REQUEST,
    method: 'POST',
    body: { admin: decamelizeKeys(admin) },
    url,
    successAction: success(actions.API_SESSIONS_CREATE),
    failureAction: failure(actions.API_SESSIONS_CREATE)
  })
}

export function * updateSession (): Generator<any, any, any> {
  const url = `${API_URL}${API_SESSIONS_PATH}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'PUT',
    url,
    body: {},
    successAction: success(actions.API_SESSIONS_UPDATE),
    failureAction: failure(actions.API_SESSIONS_UPDATE)
  })
}

export function * logOut (): Generator<any, any, any> {
  StateLoader.deleteAuth()
  yield history.replace(LOGIN_URL)
}

export function * onAuthed () : Generator<any, any, any> {
  yield history.replace(JOBS_URL)
}

export default function * authSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_SESSIONS_CREATE, logIn),
    yield takeLatest(actions.API_SESSIONS_UPDATE, updateSession),
    yield takeEvery([actions.LOG_OUT, failure(actions.API_SESSIONS_UPDATE)], logOut),
    yield takeLatest(success(actions.API_SESSIONS_CREATE), onAuthed)
  ])
}
