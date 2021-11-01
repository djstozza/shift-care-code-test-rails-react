import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, useLocation } from 'react-router-dom'

import { authActions } from 'state/auth'
import { LOGIN_URL } from 'utilities/constants'

import type { Admin } from 'types'

type Props = {
  admin: Admin,
  updateSession: () => void,
  children: any
}

export const PrivateRoute = (props: Props) => {
  const { admin, updateSession, children } = props

  const { pathname } = useLocation()

  useEffect(
    () => {
      updateSession()
    }, [updateSession, pathname]
  )

  if (!admin) return <Redirect to={LOGIN_URL} />
  return children
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
  updateSession: authActions.updateSession
}

export default connect(mapStateToProps, matchDispatchToProps)(PrivateRoute)
