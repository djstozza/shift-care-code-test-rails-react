import { expectSaga } from 'redux-saga-test-plan'
import qs from 'qs'
import { stringify, decamelize } from 'utilities/helpers'

import { API_URL, JOBS_URL } from 'utilities/constants'
import { success, failure } from 'utilities/actions'
import jobsSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

const startTime = '2021-11-01T03:02:19Z'
const endTime = '2021-11-01T07:01:23Z'

describe('Jobs sagas', () => {
  test('fetchJobs', () => {
    expectSaga(jobsSagas, actions.fetchJobs({ startTime, endTime }))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${JOBS_URL}`,
        successAction: success(actions.API_JOBS_INDEX),
        failureAction: failure(actions.API_JOBS_INDEX)
      })
      .dispatch({ type: actions.API_JOBS_INDEX, startTime, endTime })
      .run()

    const plumberId = '5'

    expectSaga(jobsSagas, actions.fetchJobs({ startTime, endTime, plumberId }))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${JOBS_URL}`,
        successAction: success(actions.API_JOBS_INDEX),
        failureAction: failure(actions.API_JOBS_INDEX)
      })
      .dispatch({ type: actions.API_JOBS_INDEX, startTime, endTime, plumberId })
      .run()
  })

  test('createJob', () => {
    const job = {
      startTime,
      endTime,
      clientId: '1',
      plumberIds: ['10', '20']
    }
    expectSaga(jobsSagas, actions.createJob({ job }))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${JOBS_URL}`,
        body: { job: decamelize(job) },
        successAction: success(actions.API_JOBS_CREATE),
        failureAction: failure(actions.API_JOBS_CREATE)
      })
      .dispatch({ type: actions.API_JOBS_CREATE, job })
      .run()
  })

  test('jobCreateSuccess', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.jobCreateSuccess)
      .dispatch({ type: success(actions.API_JOBS_CREATE) })
      .run()
    expect(historyReplaceSpy).toHaveBeenCalledWith(JOBS_URL)
  })
})
