import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './app'

import history from 'state/history'
import store from 'state/configureStore'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
