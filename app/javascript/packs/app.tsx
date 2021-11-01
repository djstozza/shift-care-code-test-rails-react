import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import LoadingBar from 'react-redux-loading-bar'

import LoginPage from 'pages/loginPage'
import ClientPage from 'pages/clientPage'

import {
  LOGIN_URL,
  CLIENTS_URL
} from 'utilities/constants'

const theme = createTheme()

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LoadingBar />
      <Switch>
        <Route exact path={LOGIN_URL} render={(props) => <LoginPage {...props} />} />
        <Route exact path={`${CLIENTS_URL}/new`} render={(props) => <ClientPage {...props} />} />
      </Switch>
    </ThemeProvider>
  );
}

export default App
