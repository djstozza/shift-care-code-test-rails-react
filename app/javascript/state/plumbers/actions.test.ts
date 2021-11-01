import * as actions from './actions'

import { PLUMBER_BASE_1, ADDRESS_1 } from 'test/fixtures'


describe('Plumber actions', () => {
  test('initializePlumberForm', () => {
    expect(actions.initializePlumberForm()).toEqual({ type: actions.INITIALIZE_PLUMBER_FORM })
  })

  test('fetchPlumbers', () => {
    expect(actions.fetchPlumbers()).toEqual({ type: actions.API_PLUMBERS_INDEX })
  })

  test('createPlumber', () => {
    const plumber = { ...PLUMBER_BASE_1, ...ADDRESS_1 }
    expect(actions.createPlumber({ plumber })).toEqual({ type: actions.API_PLUMBERS_CREATE, plumber })
  })
})
