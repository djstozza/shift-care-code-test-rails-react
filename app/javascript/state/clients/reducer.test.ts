import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { BASE_CLIENTS } from 'test/fixtures'

const errors = [{ failure: true }]

describe('Clients reducer handles action', () => {
  test(actions.INITIALIZE_CLIENT_FORM, () => {
    const state = { ...initialState, errors }

    expect(reducer(state, {
      type: actions.INITIALIZE_CLIENT_FORM
    }))
      .toEqual({ ...state, errors: [] })
  })

  test(success(actions.API_CLIENTS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_CLIENTS_INDEX),
      data: BASE_CLIENTS
    }))
      .toEqual({ ...initialState, data: BASE_CLIENTS })
  })

  test(actions.API_CLIENTS_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_CLIENTS_INDEX
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(actions.API_CLIENTS_CREATE, () => {
    expect(reducer(initialState, {
      type: actions.API_CLIENTS_CREATE
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(failure(actions.API_CLIENTS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_CLIENTS_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test(failure(actions.API_CLIENTS_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_CLIENTS_CREATE),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
