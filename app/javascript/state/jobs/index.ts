import reducer from './reducer'
import type { State } from './reducer'

import * as jobsActions from './actions'
import jobsSagas from './sagas'

export {
  jobsActions,
  jobsSagas
}

export type JobsState = State

export default reducer
