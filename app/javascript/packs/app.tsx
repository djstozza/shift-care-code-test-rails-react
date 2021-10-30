import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import LoadingBar from 'react-redux-loading-bar'

import LoginPage from 'pages/loginPage'

import {
  LOGIN_URL
} from 'utilities/constants'

const theme = createTheme()

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LoadingBar />
      <Switch>
        <Route exact path={LOGIN_URL} render={(props) => <LoginPage {...props} />} />
      </Switch>
    </ThemeProvider>
  );
}

export default App
