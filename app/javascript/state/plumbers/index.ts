import reducer from './reducer'
import type { State } from './reducer'

import * as plumbersActions from './actions'
import plumbersSagas from './sagas'

export {
  plumbersActions,
  plumbersSagas
}

export type PlumbersState = State

export default reducer
