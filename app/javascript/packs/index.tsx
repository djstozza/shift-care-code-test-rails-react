import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

// import './index.css'
// import App from './App'

import history from 'state/history'
import store from 'state/configureStore'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router history={history}>

      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
