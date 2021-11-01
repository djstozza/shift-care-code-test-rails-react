import { expectSaga } from 'redux-saga-test-plan'
import qs from 'qs'
import { stringify, decamelize } from 'utilities/helpers'

import { API_URL, CLIENTS_URL, JOBS_URL } from 'utilities/constants'
import { CLIENT_BASE_1, ADDRESS_1 } from 'test/fixtures'
import { success, failure } from 'utilities/actions'
import clientsSagas, * as sagas from './sagas'
import * as actions from './actions'
import * as requestActions from 'state/request/actions'
import history from 'state/history'

describe('Client sagas', () => {
  test('fetchClients', () => {
    expectSaga(clientsSagas, actions.fetchClients())
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${CLIENTS_URL}`,
        successAction: success(actions.API_CLIENTS_INDEX),
        failureAction: failure(actions.API_CLIENTS_INDEX)
      })
      .dispatch({ type: actions.API_CLIENTS_INDEX })
      .run()
  })

  test('createClient', () => {
    const client = { ...CLIENT_BASE_1, ...ADDRESS_1 }
    expectSaga(clientsSagas, actions.createClient({ client }))
      .put({
        type: requestActions.AUTHED_REQUEST,
        method: 'GET',
        url: `${API_URL}${CLIENTS_URL}`,
        body: { client: decamelize(client) },
        successAction: success(actions.API_CLIENTS_CREATE),
        failureAction: failure(actions.API_CLIENTS_CREATE)
      })
      .dispatch({ type: actions.API_CLIENTS_CREATE, client })
      .run()
  })

  test('clientCreateSuccess', () => {
    const historyReplaceSpy = jest.spyOn(history, 'replace')

    expectSaga(sagas.clientCreateSuccess)
      .dispatch({ type: success(actions.API_CLIENTS_CREATE) })
      .run()
    expect(historyReplaceSpy).toHaveBeenCalledWith(JOBS_URL)
  })
})
