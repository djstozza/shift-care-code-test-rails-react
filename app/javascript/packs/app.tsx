import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import LoadingBar from 'react-redux-loading-bar'

import LoginPage from 'pages/loginPage'
import JobsPage from 'pages/jobsPage'
import NewClientPage from 'pages/newClientPage'
import NewPlumberPage from 'pages/newPlumberPage'
import NewJobPage from 'pages/newJobPage'
import PrivateRoute from './privateRoute'

import {
  LOGIN_URL,
  CLIENTS_URL,
  PLUMBERS_URL,
  JOBS_URL
} from 'utilities/constants'

const theme = createTheme()

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LoadingBar />
      <Switch>
        <Route path={LOGIN_URL} render={(props) => <LoginPage {...props} />} />
        <PrivateRoute>
          <Switch>
            <Route exact path={`${CLIENTS_URL}/new`} render={(props) => <NewClientPage {...props} />} />
            <Route exact path={`${PLUMBERS_URL}/new`} render={(props) => <NewPlumberPage {...props} />} />
            <Route
              exact
              path={['/', JOBS_URL]}
              render={(props) => <JobsPage {...props} />}
            />
            <Route exact path={`${JOBS_URL}/new`} render={(props) => <NewJobPage {...props} />} />
          </Switch>
        </PrivateRoute>
      </Switch>
    </ThemeProvider>
  );
}

export default App
