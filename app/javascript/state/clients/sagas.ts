import { put, takeLatest, all, select } from 'redux-saga/effects'
import qs from 'qs'
import { stringify, decamelize } from 'utilities/helpers'

import { API_URL, CLIENTS_URL, JOBS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

export function * fetchClients () : Generator<any, any, any> {
  const url = `${API_URL}${CLIENTS_URL}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_CLIENTS_INDEX),
    failureAction: failure(actions.API_CLIENTS_INDEX)
  })
}

export function * createClient (action) : Generator<any, any, any> {
  const { client } = action
  const url = `${API_URL}${CLIENTS_URL}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    body: { client: decamelize(client) },
    successAction: success(actions.API_CLIENTS_CREATE),
    failureAction: failure(actions.API_CLIENTS_CREATE)
  })
}

export function * clientCreateSuccess () : Generator<any, any, any> {
  yield history.replace(`${JOBS_URL}`)
}

export default function * clientsSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_CLIENTS_INDEX, fetchClients),
    yield takeLatest(actions.API_CLIENTS_CREATE, createClient),
    yield takeLatest(success(actions.API_CLIENTS_CREATE), clientCreateSuccess)
  ])
}
