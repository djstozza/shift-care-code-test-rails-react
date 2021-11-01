import React from 'react'
import { connect } from 'react-redux'

import CreateForm from 'common/createForm'

import { clientsActions } from 'state/clients'

import type { Error } from 'types'

type Props = {
  submitting: boolean,
  create: Function,
  initializeForm: () => void,
  errors: Error[]
}

export const NewClientPage = (props: Props) => {
  const { create, errors = [], submitting, initializeForm } = props

  return (
    <CreateForm
      resource='client'
      errors={errors}
      create={create}
      submitting={submitting}
      initializeForm={initializeForm}
      showDateOfBirth
      showPrivateNote
    />
  )
}

const mapStateToProps = ({ clients: { errors = [], submitting } }) => ({
  errors,
  submitting
})

const matchDispatchToProps = {
  initializeForm: clientsActions.initializeClientForm,
  create: clientsActions.createClient
}

export default connect(mapStateToProps, matchDispatchToProps)(NewClientPage)
