import * as actions from './actions'

import { CLIENT_BASE_1, ADDRESS_1 } from 'test/fixtures'


describe('Client actions', () => {
  test('initializeClientForm', () => {
    expect(actions.initializeClientForm()).toEqual({ type: actions.INITIALIZE_CLIENT_FORM })
  })

  test('fetchClients', () => {
    expect(actions.fetchClients()).toEqual({ type: actions.API_CLIENTS_INDEX })
  })

  test('createClient', () => {
    const client = { ...CLIENT_BASE_1, ...ADDRESS_1 }
    expect(actions.createClient({ client })).toEqual({ type: actions.API_CLIENTS_CREATE, client })
  })
})
