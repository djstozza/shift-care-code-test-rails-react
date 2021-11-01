import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  Grid,
  TextField,
  Button,
  Theme,
  Paper,
  Box,
  Autocomplete
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import { clientsActions } from 'state/clients'
import { plumbersActions } from 'state/plumbers'
import { jobsActions } from 'state/jobs'

import type { Error, ClientBase, PlumberBase } from 'types'

type Props = {
  initializeForm: () => void,
  create: Function,
  fetchClients: () => void,
  fetchPlumbers: () => void,
  clients: Client[],
  plumbers: PlumberBase[],
  errors: error[],
  submitting: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: theme.spacing(80)
  }
}))

export const NewJobPage = (props: Props) => {
  const {
    initializeForm,
    create,
    fetchClients,
    fetchPlumbers,
    clients,
    plumbers,
    errors = [],
    submitting
  } = props

  const [clientId, setClientId] = useState('')
  const [plumberIds, setPlumberIds] = useState([])
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const classes = useStyles()

  useEffect(() => {
    initializeForm()
  }, [initializeForm])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  useEffect(() => {
    fetchPlumbers()
  }, [fetchPlumbers])

  const handleSubmit = (e) => {
    e.preventDefault()

    create({
      job: {
        clientId,
        plumberIds,
        startTime,
        endTime
      }
    })
  }

  const clientOptions = clients.map(({ id, firstName, lastName }) => ({
    label: `${firstName} ${lastName}`,
    value: id
  }))

  const plumberOptions = plumbers.map(({ id, firstName, lastName }) => ({
    label: `${firstName} ${lastName}`,
    value: id
  }))

  const disabled = (
    !clientId ||
    !plumberIds.length ||
    !startTime ||
    !endTime
  )

  console.log(errors)

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
              New Job
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                options={clientOptions}
                autoComplete
                name='clientId'
                onChange={(_, selected) => setClientId(selected?.value || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Client'
                    error={Boolean(errors.find(({ source }) => source.includes('client')))}
                    helperText={errors.find(({ source }) => source.includes('client'))?.detail}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                options={plumberOptions}
                autoComplete
                multiple
                onChange={(_, selected) => {
                  console.log(selected)
                  const newValue = selected.map(({ value }) => value)

                  setPlumberIds(newValue)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    name='plumberIds'
                    label='Plumbers'
                    error={Boolean(errors.find(({ source }) => source.includes('plumber')))}
                    helperText={errors.find(({ source }) => source.includes('plumber'))?.detail}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Start Time'
                type='datetime-local'
                name='startTime'
                fullWidth
                defaultValue={startTime}
                onChange={({ target: { value } }) => setStartTime(new Date(value))}
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.find(({ source }) => source.includes('start_time')))}
                helperText={errors.find(({ source }) => source.includes('start_time'))?.detail}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='End Time'
                type='datetime-local'
                name='endTime'
                fullWidth
                defaultValue={endTime}
                onChange={({ target: { value }}) => setEndTime(new Date(value))}
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.find(({ source }) => source.includes('end_time')))}
                helperText={errors.find(({ source }) => source.includes('end_time'))?.detail}
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

const mapStateToProps = ({
  clients: { data: clients },
  plumbers: { data: plumbers },
  jobs: {
    submitting,
    errors = []
  }
}) => ({
  clients,
  plumbers,
  submitting,
  errors
})

const matchDispatchToProps = {
  initializeForm: jobsActions.initializeJobForm,
  create: jobsActions.createJob,
  fetchClients: clientsActions.fetchClients,
  fetchPlumbers: plumbersActions.fetchPlumbers
}

export default connect(mapStateToProps, matchDispatchToProps)(NewJobPage)
