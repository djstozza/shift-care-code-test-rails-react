import React, { useState, useEffect } from 'react'

import {
  Typography,
  Grid,
  TextField,
  Button,
  Theme,
  Paper,
  Box
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {
  LocalizationProvider,
  DatePicker
} from '@mui/lab'
import { makeStyles } from '@mui/styles'

import { capitalize } from 'utilities/helpers'
import { clientsActions } from 'state/clients'

import type { Error } from 'types'

type Props = {
  submitting: boolean,
  create: Function,
  initializeForm: () => void,
  errors: Error[],
  showDateOfBirth: boolean,
  showPrivateNote: boolean,
  resource: string
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: theme.spacing(80)
  }
}))

export const CreateForm = (props: Props) => {
  const { create, errors = [], submitting, initializeForm, showDateOfBirth, showPrivateNote, resource } = props
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [privateNote, setPrivateNote] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [suburb, setSuburb] = useState('')
  const [state, setState] = useState('')
  const [postCode, setPostCode] = useState('')
  const [country, setCountry] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    create({
      [resource]: {
        firstName,
        lastName,
        email,
        dateOfBirth,
        privateNote,
        addressLine1,
        addressLine2,
        suburb,
        state,
        postCode,
        country
      }
    })
  }

  useEffect(() => {
    initializeForm()
  }, [initializeForm])

  const classes = useStyles()

  const disabled = (
    !firstName ||
    !lastName ||
    !email ||
    (showDateOfBirth && !dateOfBirth) ||
    !addressLine1 ||
    !suburb ||
    !state ||
    !postCode ||
    !country ||
    submitting
  )

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paper}>
          <Box mb={2}>
            <Typography variant='h5'>
              New {capitalize(resource)}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant='outlined'
                label='First Name'
                name='firstName'
                onChange={({ target: { value }}) => setFirstName(value)}
                value={email}
                error={Boolean(errors.find(({ source }) => source.includes('first_name')))}
                helperText={errors.find(({ source }) => source === 'first_name')?.detail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant='outlined'
                label='Last Name'
                name='lastName'
                onChange={({ target: { value }}) => setLastName(value)}
                value={lastName}
                error={Boolean(errors.find(({ source }) => source.includes('last_name')))}
                helperText={errors.find(({ source }) => source.includes('last_name'))?.detail}
              />
            </Grid>
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
            {
              showDateOfBirth &&
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label='Date of Birth'
                    value={dateOfBirth}
                    onChange={(newValue) => setDateOfBirth(newValue)}
                    renderInput={
                      (params) => (
                        <TextField
                          required
                          fullWidth
                          error={Boolean(errors.find(({ source }) => source.includes('date_of_birth')))}
                          helperText={errors.find(({ source }) => source === 'date_of_birth')?.detail}
                          {...params}
                        />
                      )
                    }
                  />
                </LocalizationProvider>
              </Grid>
            }
            {
              showPrivateNote &&
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant='outlined'
                  label='Private Note'
                  name='privateNote'
                  onChange={({ target: { value }}) => setPrivateNote(value)}
                  value={privateNote}
                />
              </Grid>
            }
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant='outlined'
                label='Address Line 1'
                name='addressLine1'
                onChange={({ target: { value }}) => setAddressLine1(value)}
                value={addressLine1}
                error={Boolean(errors.find(({ source }) => source.includes('address_line_1')))}
                helperText={errors.find(({ source }) => source.includes('address_line_1'))?.detail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant='outlined'
                label='Address Line 2'
                name='addressLine2'
                onChange={({ target: { value }}) => setAddressLine2(value)}
                value={addressLine2}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                variant='outlined'
                label='Suburb'
                name='suburb'
                onChange={({ target: { value }}) => setSuburb(value)}
                value={suburb}
                error={Boolean(errors.find(({ source }) => source.includes('suburb')))}
                helperText={errors.find(({ source }) => source.includes('suburb'))?.detail}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                variant='outlined'
                label='State'
                name='state'
                onChange={({ target: { value }}) => setState(value)}
                value={lastName}
                error={Boolean(errors.find(({ source }) => source.includes('state')))}
                helperText={errors.find(({ source }) => source.includes('state'))?.detail}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                variant='outlined'
                label='Post Code'
                name='postCode'
                onChange={({ target: { value }}) => setPostCode(value)}
                value={postCode}
                error={Boolean(errors.find(({ source }) => source.includes('post_code')))}
                helperText={errors.find(({ source }) => source.includes('post_code'))?.detail}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                variant='outlined'
                label='Country'
                name='country'
                onChange={({ target: { value }}) => setCountry(value)}
                value={country}
                error={Boolean(errors.find(({ source }) => source.includes('country')))}
                helperText={errors.find(({ source }) => source.includes('country'))?.detail}
              />
            </Grid>
          </Grid>

          <Box mt={2} display='flex' justifyContent='end'>
            <Button
              type='submit'
              disabled={disabled}
              variant='contained'
              color='primary'
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  )
}

export default CreateForm
