import React from 'react'
import { connect } from 'react-redux'
import {
  Typography,
  AppBar,
  Button,
  Box,
  Toolbar,
  Theme,
  makeStyles
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { authActions } from 'state/auth'

type Props = {
  logOut: () => void
}

const useStyles = makeStyles(() => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

const NavBar = (props) => {
  const { logOut } = props

  const classes = useStyles()

  return (
    <Box mb={4} >
      <AppBar position='static' color='primary'>
        <Toolbar className={classes.toolbar}>
          <Button
            component={Link}
            to='/clients/new'
            color='inherit'
          >
            New client
          </Button>
          <Button
            component={Link}
            to='/plumbers/new'
            color='inherit'
          >
            New plumber
          </Button>
          <Button
            component={Link}
            to='/jobs/new'
            color='inherit'
          >
            New job
          </Button>
          <Button
            component={Link}
            to='/jobs'
            color='inherit'
          >
            Jobs
          </Button>
          <Button
            color='inherit'
            onClick={() => logOut()}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}


const mapStateToProps = (state) => {
  const {
    auth: { admin }
  } = state

  return {
    admin
  }
}

const matchDispatchToProps = {
  logOut: authActions.logOut
}

export default connect(mapStateToProps, matchDispatchToProps)(NavBar)
