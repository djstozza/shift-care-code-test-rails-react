import { put, takeLatest, all, select } from 'redux-saga/effects'
import qs from 'qs'
import { stringify, decamelize } from 'utilities/helpers'

import { API_URL, PLUMBERS_URL, JOBS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

export function * fetchPlumbers () : Generator<any, any, any> {
  const url = `${API_URL}${PLUMBERS_URL}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_PLUMBERS_INDEX),
    failureAction: failure(actions.API_PLUMBERS_INDEX)
  })
}

export function * createPlumber (action) : Generator<any, any, any> {
  const { plumber } = action
  const url = `${API_URL}${PLUMBERS_URL}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    body: { plumber: decamelize(plumber) },
    successAction: success(actions.API_PLUMBERS_CREATE),
    failureAction: failure(actions.API_PLUMBERS_CREATE)
  })
}

export function * plumberCreateSuccess () : Generator<any, any, any> {
  yield history.replace(`${JOBS_URL}`)
}

export default function * plumbersSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_PLUMBERS_INDEX, fetchPlumbers),
    yield takeLatest(actions.API_PLUMBERS_CREATE, createPlumber),
    yield takeLatest(success(actions.API_PLUMBERS_CREATE), plumberCreateSuccess)
  ])
}
