import * as actions from './actions'
import { success, failure } from 'utilities/actions'

import type { Job, Action, Error } from 'types'

export type State = {
  data: Job[],
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
    case actions.INITIALIZE_JOB_FORM:
      return { ...state, errors: [] }
    case actions.API_JOBS_INDEX:
      return { ...state, fetching: true }
    case actions.API_JOBS_CREATE:
      return { ...state, submitting: true }
    case success(actions.API_JOBS_INDEX):
    case success(actions.API_JOBS_CREATE):
      return { ...state, data, errors: [], fetching: false, submitting: false }
    case failure(actions.API_JOBS_INDEX):
    case failure(actions.API_JOBS_CREATE):
      return { ...state, errors, fetching: false, submitting: false }
    default:
      return state
  }
}

export default reducer
