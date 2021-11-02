import React from 'react'
import {
  Typography,
  AppBar,
  Button,
  Box,
  Toolbar
} from '@mui/material'
import { Link } from 'react-router-dom'

const NavBar = () => (
  <Box mb={4} sx={{ flexGrow: 1 }}>
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Scheduler
        </Typography>
        <Button
          component={Link}
          to='/clients/new'
          color='inherit'
        >
          New Client
        </Button>
        <Button
          component={Link}
          to='/plumbers/new'
          color='inherit'
        >
          New Plumber
        </Button>
        <Button
          component={Link}
          to='/jobs/new'
          color='inherit'
        >
          New Job
        </Button>
        <Button
          component={Link}
          to='/jobs'
          color='inherit'
        >
          Jobs
        </Button>
      </Toolbar>
    </AppBar>
  </Box>
)

export default NavBar
