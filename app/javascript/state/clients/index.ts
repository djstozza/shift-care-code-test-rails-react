import reducer from './reducer'
import type { State } from './reducer'

import * as clientsActions from './actions'
import clientsSagas from './sagas'

export {
  clientsActions,
  clientsSagas
}

export type ClientsState = State

export default reducer
