import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import CreateForm from 'common/createForm'

import { plumbersActions } from 'state/plumbers'

import type { Error } from 'types'

type Props = {
  submitting: boolean,
  create: Function,
  initializeForm: () => void,
  errors: Error[]
}

export const NewPlumberPage = (props: Props) => {
  const { create, errors = [], submitting, initializeForm } = props

  return (
    <CreateForm
      resource='plumber'
      errors={errors}
      create={create}
      submitting={submitting}
      initializeForm={initializeForm}
    />
  )
}

const mapStateToProps = ({ plumbers: { errors = [], submitting } }) => ({
  errors,
  submitting
})

const matchDispatchToProps = {
  initializeForm: plumbersActions.initializePlumberForm,
  create: plumbersActions.createClient
}

export default connect(mapStateToProps, matchDispatchToProps)(NewPlumberPage)
