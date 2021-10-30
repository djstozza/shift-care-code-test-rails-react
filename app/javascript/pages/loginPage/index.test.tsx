// import { createMount } from '@mui/material/test-utils'
import React from 'react'
import { mount } from 'enzyme'

import ConnectedLoginPage, { LoginPage } from '.'
import { MuiWrapper, MockedRouterStore, blank__ } from 'test/helpers'

const email = 'admin@example.com'
const password = 'password'
const errors = [
  {
    code: 'is invalid',
    detail: 'Email or password is invalid',
    source: 'email or password',
    title: 'Is Invalid'
  }
]

describe('LoginPage', () => {
  const render = (props = {}) => mount(
    <MuiWrapper>
      <MockedRouterStore>
        <LoginPage
          initializeAuth={blank__}
          logIn={blank__}
          {...props}
        />
      </MockedRouterStore>
    </MuiWrapper>
  )

  const connectedRender = (state = {}) => mount(
    <MuiWrapper>
      <MockedRouterStore defaultState={{ ...state }}>
        <ConnectedLoginPage initializeAuth={blank__} />
      </MockedRouterStore>
    </MuiWrapper>
  )

  const emailInput = wrapper => wrapper.find({ name: 'email' }).find('input')
  const passwordInput = wrapper => wrapper.find({ name: 'password' }).find('input')
  const submitButton = wrapper => wrapper.find('button')
  const helperText = wrapper => wrapper.find('ForwardRef(FormHelperText)')

  it('triggers initialAuth on load', () => {
    const initializeAuth = jest.fn()

    render({ initializeAuth })

    expect(initializeAuth).toHaveBeenCalled()
  })

  it('triggers logIn with the email, adminname and password', () => {
    const logIn = jest.fn()
    const wrapper = render({ logIn })

    expect(submitButton(wrapper).props().disabled).toEqual(true)

    emailInput(wrapper).simulate('change', { target: { value: email } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    passwordInput(wrapper).simulate('change', { target: { value: password } })

    expect(submitButton(wrapper).props().disabled).toEqual(false)

    submitButton(wrapper).simulate('submit')

    expect(logIn).toHaveBeenCalledWith({ admin: { email, password } })
  })

  it('disables the submit button when submitting = true', () => {
    const wrapper = connectedRender({ auth: { submitting: true } })

    emailInput(wrapper).simulate('change', { target: { value: email } })
    passwordInput(wrapper).simulate('change', { target: { value: password } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)
  })

  it('shows errors', () => {
    const wrapper = connectedRender({ auth: { errors } })

    expect(helperText(wrapper).text()).toEqual('Email or password is invalid')
    expect(emailInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(passwordInput(wrapper).props()['aria-invalid']).toEqual(true)
  })
})
