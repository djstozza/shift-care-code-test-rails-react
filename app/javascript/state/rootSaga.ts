import { fork, all } from 'redux-saga/effects'

import { authSagas } from './auth'
import { clientsSagas } from './clients'
import { jobsSagas } from './jobs'
import { plumbersSagas } from './plumbers'
import { requestSagas } from './request'

export default function * rootSaga () : Generator<any, any, any> {
  yield all([
    fork(authSagas),
    fork(clientsSagas),
    fork(jobsSagas),
    fork(plumbersSagas),
    fork(requestSagas)
  ])
}
