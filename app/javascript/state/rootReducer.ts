import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import auth from './auth'
import clients from './clients'
import request from './request'

const rootReducer = combineReducers({
  auth,
  clients,
  request,
  loadingBar: loadingBarReducer
})

export default rootReducer
