import * as actions from './actions'
import { success, failure } from 'utilities/actions'
import moment from 'moment'

import type { Job, Action, Error } from 'types'

export type State = {
  data: Job[],
  fetching: boolean,
  submitting: boolean,
  errors: Error[],
  startTime: string,
  view: Day | Week,
  plumberId?: string
}

export const initialFilterState = {
  startTime: moment().startOf('Week').toISOString(),
  view: 'Week'
}

export const initialState = {
  data: [],
  errors: [],
  fetching: false,
  submitting: false,
  ...initialFilterState
}

const reducer = (state: State = initialState, action: Action) => {
  const { data = [], view, startTime, errors } = action

  switch (action.type) {
    case actions.INITIALIZE_JOB_FORM:
      return { ...state, errors: [] }
    case actions.API_JOBS_INDEX:
      return { ...state, view, startTime, fetching: true }
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
