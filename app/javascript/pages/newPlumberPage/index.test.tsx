import React from 'react'
import { mount } from 'enzyme'

import ConnectedNewPlumberPage, { NewPlumberPage } from '.'
import { MuiWrapper, MockedRouterStore, blank__ } from 'test/helpers'
import { decamelize } from 'utilities/helpers'

import { CLIENT_BASE_1, ADDRESS_1 } from 'test/fixtures'

describe('NewPlumberPage', () => {
  const render = (props = {}) => mount(
    <MuiWrapper>
      <MockedRouterStore>
        <NewPlumberPage
          initializeForm={blank__}
          create={blank__}
          {...props}
        />
      </MockedRouterStore>
    </MuiWrapper>
  )

  const connectedRender = (state = {}) => mount(
    <MuiWrapper>
      <MockedRouterStore defaultState={{...state }}>
        <ConnectedNewPlumberPage initializeAuth={blank__} />
      </MockedRouterStore>
    </MuiWrapper>
  )

  const firstNameInput = wrapper => wrapper.find({ name: 'firstName' }).find('input')
  const lastNameInput = wrapper => wrapper.find({ name: 'lastName' }).find('input')
  const emailInput = wrapper => wrapper.find({ name: 'email' }).find('input')
  const dateOfBirthInput = wrapper => wrapper.find('ForwardRef(DatePicker)').find('input')
  const addressLine1Input = wrapper => wrapper.find({ name: 'addressLine1' }).find('input')
  const addressLine2Input = wrapper => wrapper.find({ name: 'addressLine2' }).find('input')
  const suburbInput = wrapper => wrapper.find({ name: 'suburb' }).find('input')
  const stateInput = wrapper => wrapper.find({ name: 'state' }).find('input')
  const postCodeInput = wrapper => wrapper.find({ name: 'postCode' }).find('input')
  const countryInput = wrapper => wrapper.find({ name: 'country' }).find('input')

  const submitButton = wrapper => wrapper.find({ type: 'submit' }).at(wrapper.find({ type: 'submit' }).length - 1)

  it('triggers initialAuth on load', () => {
    const initializeForm = jest.fn()

    render({ initializeForm })

    expect(initializeForm).toHaveBeenCalled()
  })

  it('triggers logIn with the email, adminname and password', () => {
    const create = jest.fn()
    const wrapper = render({ create })

    expect(submitButton(wrapper).props().disabled).toEqual(true)

    firstNameInput(wrapper).simulate('change', { target: { value: CLIENT_BASE_1.firstName } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    lastNameInput(wrapper).simulate('change', { target: { value: CLIENT_BASE_1.lastName } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    emailInput(wrapper).simulate('change', { target: { value: CLIENT_BASE_1.email } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    addressLine1Input(wrapper).simulate('change', { target: { value: ADDRESS_1.addressLine1 } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    addressLine2Input(wrapper).simulate('change', { target: { value: ADDRESS_1.addressLine2 } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    suburbInput(wrapper).simulate('change', { target: { value: ADDRESS_1.suburb } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    stateInput(wrapper).simulate('change', { target: { value: ADDRESS_1.state } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    postCodeInput(wrapper).simulate('change', { target: { value: ADDRESS_1.postCode } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    countryInput(wrapper).simulate('change', { target: { value: ADDRESS_1.country } })
    expect(submitButton(wrapper).props().disabled).toEqual(false)

    submitButton(wrapper).simulate('submit')

    expect(create).toHaveBeenCalled()
  })

  it('disables the submit button when submitting = true', () => {
    const wrapper = connectedRender({ plumbers: { submitting: true } })

    expect(submitButton(wrapper).props().disabled).toEqual(true)
  })

  it('shows errors', () => {
    const errors = Object.keys(decamelize({ ...CLIENT_BASE_1, ...ADDRESS_1 })).map(key => ({
      code: 'is invalid',
      detail: 'Is invalid',
      source: key,
      title: 'Is Invalid'
    }))

    const wrapper = connectedRender({ plumbers: { errors } })

    expect(firstNameInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(lastNameInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(emailInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(addressLine1Input(wrapper).props()['aria-invalid']).toEqual(true)
    expect(suburbInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(stateInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(postCodeInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(countryInput(wrapper).props()['aria-invalid']).toEqual(true)
  })
})
