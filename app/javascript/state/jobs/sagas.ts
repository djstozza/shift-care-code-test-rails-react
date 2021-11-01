import { put, takeLatest, all, select } from 'redux-saga/effects'
import qs from 'qs'
import { stringify, decamelize } from 'utilities/helpers'

import { API_URL, JOBS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

export function * fetchJobs (action) : Generator<any, any, any> {
  const { startTime, endTime, plumberId } = action
  const query = {
    filter: {
      startTime,
      endTime,
      plumberId
    }
  }

  const url = `${API_URL}${JOBS_URL}?${stringify(query)}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'GET',
    url,
    successAction: success(actions.API_JOBS_INDEX),
    failureAction: failure(actions.API_JOBS_INDEX)
  })
}

export function * createJob (action) : Generator<any, any, any> {
  const { job } = action
  const url = `${API_URL}${JOBS_URL}`

  yield put({
    type: requestActions.AUTHED_REQUEST,
    method: 'POST',
    url,
    body: { job: decamelize(job) },
    successAction: success(actions.API_JOBS_CREATE),
    failureAction: failure(actions.API_JOBS_CREATE)
  })
}

export function * jobCreateSuccess () : Generator<any, any, any> {
  yield history.replace(`${JOBS_URL}`)
}

export default function * jobsSagas () : Generator<any, any, any> {
  yield all([
    yield takeLatest(actions.API_JOBS_INDEX, fetchJobs),
    yield takeLatest(actions.API_JOBS_CREATE, createJob),
    yield takeLatest(success(actions.API_JOBS_CREATE), jobCreateSuccess)
  ])
}
