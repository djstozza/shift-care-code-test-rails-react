import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { PlumberBase, Action, Error } from 'types'

export type State = {
  data: PlumberBase[],
  fetching: boolean,
  submitting: boolean,
  errors: Error[]
}

export const initialState = {
  data: [],
  errors: [],
  fetching: false,
  submitting: false
}

const reducer = (state: State = initialState, action: Action) => {
  const { data = [], errors } = action

  switch (action.type) {
    case actions.INITIALIZE_PLUMBER_FORM:
      return { ...state, errors: [] }
    case actions.API_PLUMBERS_INDEX:
      return { ...state, fetching: true }
    case actions.API_PLUMBERS_CREATE:
      return { ...state, submitting: true }
    case success(actions.API_PLUMBERS_INDEX):
    case success(actions.API_PLUMBERS_CREATE):
      return { ...state, data, errors: [], fetching: false, submitting: false }
    case failure(actions.API_PLUMBERS_INDEX):
    case failure(actions.API_PLUMBERS_CREATE):
      return { ...state, errors, fetching: false, submitting: false }
    default:
      return state
  }
}

export default reducer
