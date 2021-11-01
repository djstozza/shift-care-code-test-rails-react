import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  Box,
  TextField,
  Button,
  Theme,
  Paper,
  Grid
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import Link from 'components/common/link'

import { authActions } from 'state/auth'

import type { Error } from 'types'

type Props = {
  token?: string,
  submitting: boolean,
  logIn: Function,
  initializeAuth: () => void,
  errors: Error[]
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minHeight: '100vh',
    border: theme.spacing(0.375),
    boxSizing: 'border-box'
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: theme.spacing(80)
  },
  textField: {
    paddingBottom: theme.spacing(2)
  }
}))

export const LoginPage = (props: Props) => {
  const { logIn, errors = [], submitting, initializeAuth } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    logIn({ admin: { email, password } })
  }

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const classes = useStyles()

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paper}>
          <Typography variant='h5' className={classes.textField}>
            Log in
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant='outlined'
                label='Email'
                name='email'
                type='email'
                onChange={({ target: { value }}) => setEmail(value)}
                value={email}
                error={Boolean(errors.find(({ source }) => source.includes('email')))}
                helperText={errors.find(({ source }) => source === 'email')?.detail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant='outlined'
                label='Password'
                name='password'
                type='password'
                onChange={({ target: { value }}) => setPassword(value)}
                value={password}
                InputProps={{
                  autoComplete: 'off'
                }}
                error={Boolean(errors.find(({ source }) => source.includes('password')))}
                helperText={errors.find(({ source }) => source.includes('password'))?.detail}
              />
            </Grid>
          </Grid>

          <Box mt={2} display='flex' justifyContent='end'>
            <Button
              type='submit'
              disabled={!email || !password || submitting}
              variant='contained'
              color='primary'
            >
              Log in
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  )
}

const mapStateToProps = ({ auth: { errors = [], submitting, token } }) => ({
  errors,
  submitting,
  token
})

const matchDispatchToProps = {
  initializeAuth: authActions.initializeAuth,
  logIn: authActions.logIn
}


export default connect(mapStateToProps, matchDispatchToProps)(LoginPage)
