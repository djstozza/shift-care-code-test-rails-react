import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  Box,
  TextField,
  Button,
  Theme,
  Paper
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
  form: {
    display: 'flex',
    position: 'fixed',
    [theme.breakpoints.up('sm')]: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      top: '22.5%'
    },
  },
  paper: {
    padding: theme.spacing(3),
    width: theme.spacing(50),
    [theme.breakpoints.down('sm')]: {
      width: '100vw'
    }
  },
  textField: {
    paddingBottom: theme.spacing(2)
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  noWrap: {
    whiteSpace: 'nowrap'
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
    <form onSubmit={handleSubmit} className={classes.form}>
      <Paper className={classes.paper}>
        <Typography variant='h5' className={classes.textField}>
          Log in
        </Typography>
        <Box mb={2}>
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
        </Box>
        <Box mb={2}>
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
        </Box>

        <div className={classes.actions}>
          <Button
            className={classes.noWrap}
            type='submit'
            disabled={!email || !password || submitting}
            variant='contained'
            color='primary'
          >
            Log in
          </Button>
        </div>
      </Paper>
    </form>
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
