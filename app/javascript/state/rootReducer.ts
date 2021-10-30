import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import auth from './auth'
import request from './request'

const rootReducer = combineReducers({
  auth,
  request,
  loadingBar: loadingBarReducer
})

export default rootReducer
