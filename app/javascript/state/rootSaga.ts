import { fork, all } from 'redux-saga/effects'

import { authSagas } from './auth'
import { requestSagas } from './request'

export default function * rootSaga () : Generator<any, any, any> {
  yield all([
    fork(authSagas),
    fork(requestSagas)
  ])
}
