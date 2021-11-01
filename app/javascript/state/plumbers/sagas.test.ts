import { expectSaga } from 'redux-saga-test-plan'
import qs from 'qs'
import { stringify, decamelize } from 'utilities/helpers'

import { API_URL, PLUMBERS_URL, JOBS_URL } from 'utilities/constants'
import { PLUMBER_BASE_1, ADDRESS_1 } from 'test/fixtures'
import { success, failure } from 'utilities/actions'
import plumbersSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

describe('Plumber sagas', () => {
  test('fetchPlumbers', () => {
    expectSaga(plumbersSagas, actions.fetchPlumbers())
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${PLUMBERS_URL}`,
        successAction: success(actions.API_PLUMBERS_INDEX),
        failureAction: failure(actions.API_PLUMBERS_INDEX)
      })
      .dispatch({ type: actions.API_PLUMBERS_INDEX })
      .run()
  })

  test('createPlumber', () => {
    const plumber = { ...PLUMBER_BASE_1, ...ADDRESS_1 }
    expectSaga(plumbersSagas, actions.createPlumber({ plumber }))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${PLUMBERS_URL}`,
        body: { plumber: decamelize(plumber) },
        successAction: success(actions.API_PLUMBERS_CREATE),
        failureAction: failure(actions.API_PLUMBERS_CREATE)
      })
      .dispatch({ type: actions.API_PLUMBERS_CREATE, plumber })
      .run()
  })

  test('plumberCreateSuccess', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.plumberCreateSuccess)
      .dispatch({ type: success(actions.API_PLUMBERS_CREATE) })
      .run()
    expect(historyReplaceSpy).toHaveBeenCalledWith(JOBS_URL)
  })
})
