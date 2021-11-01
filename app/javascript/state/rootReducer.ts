import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import auth from './auth'
import clients from './clients'
import jobs from './jobs'
import plumbers from './plumbers'
import request from './request'

const rootReducer = combineReducers({
  auth,
  clients,
  jobs,
  plumbers,
  request,
  loadingBar: loadingBarReducer
})

export default rootReducer
