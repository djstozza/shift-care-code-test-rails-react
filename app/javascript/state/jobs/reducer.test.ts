import { success, failure } from 'utilities/actions'
import reducer, { initialState } from './reducer'
import * as actions from './actions'
import moment from 'moment'

import { JOBS } from 'test/fixtures'

const errors = [{ failure: true }]

describe('Jobs reducer handles action', () => {
  test(actions.INITIALIZE_JOB_FORM, () => {
    const state = { ...initialState, errors }

    expect(reducer(state, {
      type: actions.INITIALIZE_JOB_FORM
    }))
      .toEqual({ ...state, errors: [] })
  })

  test(success(actions.API_JOBS_INDEX), () => {
    expect(reducer(initialState, {
      type: success(actions.API_JOBS_INDEX),
      data: JOBS
    }))
      .toEqual({ ...initialState, data: JOBS })
  })

  test(actions.API_JOBS_INDEX, () => {
    const startTime = moment().toISOString()
    const view = 'week'
    expect(reducer(initialState, {
      type: actions.API_JOBS_INDEX,
      startTime,
      view
    }))
      .toEqual({ ...initialState, startTime, view, fetching: true })
  })

  test(actions.API_JOBS_CREATE, () => {
    expect(reducer(initialState, {
      type: actions.API_JOBS_CREATE
    }))
      .toEqual({ ...initialState, submitting: true })
  })

  test(failure(actions.API_JOBS_INDEX), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_JOBS_INDEX),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test(failure(actions.API_JOBS_CREATE), () => {
    expect(reducer(initialState, {
      type: failure(actions.API_JOBS_CREATE),
      errors
    }))
      .toEqual({ ...initialState, errors })
  })

  test('unknown type and undefined state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual({ ...initialState })
  })
})
