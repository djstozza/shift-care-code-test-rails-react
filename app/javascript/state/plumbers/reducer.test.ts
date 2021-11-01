import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'

import { BASE_PLUMBERS } from 'test/fixtures'

const errors = [{ failure: true }]

describe('Plumbers reducer handles action', () => {
  test(actions.INITIALIZE_PLUMBER_FORM, () => {
    const state = { ...initialState, errors }

    expect(reducer(state, {
      type: actions.INITIALIZE_PLUMBER_FORM
    }))
      .toEqual({ ...state, errors: [] })
  })

  test(success(actions.API_PLUMBERS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_PLUMBERS_INDEX),
      data: BASE_PLUMBERS
    }))
      .toEqual({ ...initialState, data: BASE_PLUMBERS })
  })

  test(actions.API_PLUMBERS_INDEX, () => {
    expect(reducer(initialState, {
      type: actions.API_PLUMBERS_INDEX
    }))
      .toEqual({ ...initialState, fetching: true })
  })

  test(actions.API_PLUMBERS_CREATE, () => {
    expect(reducer(initialState, {
      type: actions.API_PLUMBERS_CREATE
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(failure(actions.API_PLUMBERS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_PLUMBERS_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test(failure(actions.API_PLUMBERS_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_PLUMBERS_CREATE),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
