import React from 'react'
import { mount } from 'enzyme'
import moment from 'moment'

import ConnectedNewJobPage, { NewJobPage } from '.'
import { MuiWrapper, MockedRouterStore, blank__ } from 'test/helpers'
import { decamelize } from 'utilities/helpers'

import { BASE_CLIENTS, BASE_PLUMBERS } from 'test/fixtures'

describe('NewJobPage', () => {
  const render = (props = {}) => mount(
    <MuiWrapper>
      <MockedRouterStore>
        <NewJobPage
          fetchClients={blank__}
          fetchPlumbers={blank__}
          initializeForm={blank__}
          create={blank__}
          clients={BASE_CLIENTS}
          plumbers={BASE_PLUMBERS}
          {...props}
        />
      </MockedRouterStore>
    </MuiWrapper>
  )

  const connectedRender = (state = {}) => mount(
    <MuiWrapper>
      <MockedRouterStore defaultState={{ clients: { data: [] }, plumbers: { data: [] }, ...state }}>
        <ConnectedNewJobPage
          initializeForm={blank__}
          fetchClients={blank__}
          fetchPlumbers={blank__}
        />
      </MockedRouterStore>
    </MuiWrapper>
  )

  const clientIdInput = wrapper => wrapper.find({ name: 'clientId' })
  const plumberIdsInput = wrapper => wrapper.find({ name: 'plumberIds' })
  const startTimeInput = wrapper => wrapper.find({ name: 'startTime' }).find('input')
  const endTimeInput = wrapper => wrapper.find({ name: 'endTime' }).find('input')

  const submitButton = wrapper => wrapper.find({ type: 'submit' }).at(wrapper.find({ type: 'submit' }).length - 1)

  const openAutocomplete = autocomplete => autocomplete.find('button').simulate('click')

  const li = wrapper => wrapper.find('li')

  const startTime = '2021-11-01T03:02:19Z'
  const endTime = '2021-11-01T07:01:23Z'

  it('triggers initialForm on load', () => {
    const initializeForm = jest.fn()

    render({ initializeForm })

    expect(initializeForm).toHaveBeenCalled()
  })

  it('triggers fetchClients on load', () => {
    const fetchClients = jest.fn()

    render({ fetchClients })

    expect(fetchClients).toHaveBeenCalled()
  })

  it('triggers fetchPlumbers on load', () => {
    const fetchPlumbers = jest.fn()

    render({ fetchPlumbers })

    expect(fetchPlumbers).toHaveBeenCalled()
  })

  it('triggers create', () => {
    const create = jest.fn()
    const wrapper = render({ create })

    const startTime = moment().add(2, 'hours').toISOString()
    const endTime = moment().add(3, 'hours').toISOString()

    openAutocomplete(clientIdInput(wrapper))
    li(wrapper).at(1).simulate('click')
    expect(submitButton(wrapper).props().disabled).toEqual(true)


    openAutocomplete(plumberIdsInput(wrapper))
    li(wrapper).at(0).simulate('click')
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    startTimeInput(wrapper).simulate('change', { target: { value: startTime } })
    expect(submitButton(wrapper).props().disabled).toEqual(true)

    endTimeInput(wrapper).simulate('change', { target: { value: endTime } })
    expect(submitButton(wrapper).props().disabled).toEqual(false)

    submitButton(wrapper).simulate('submit')

    expect(create).toHaveBeenCalledWith({
      job: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        clientId: BASE_CLIENTS[1].id,
        plumberIds: [BASE_PLUMBERS[0].id]
      }
    })
  })

  it('disables the submit button when submitting = true', () => {
    const wrapper = connectedRender({ jobs: { submitting: true } })

    expect(submitButton(wrapper).props().disabled).toEqual(true)
  })

  it('shows errors', () => {
    const errors = ['start_time', 'end_time', 'plumbers', 'client'].map(key => ({
      code: 'is invalid',
      detail: 'Is invalid',
      source: key,
      title: 'Is Invalid'
    }))

    const wrapper = connectedRender({ jobs: { errors } })

    expect(clientIdInput(wrapper).find('input').props()['aria-invalid']).toEqual(true)
    expect(plumberIdsInput(wrapper).find('input').props()['aria-invalid']).toEqual(true)
    expect(startTimeInput(wrapper).props()['aria-invalid']).toEqual(true)
    expect(endTimeInput(wrapper).props()['aria-invalid']).toEqual(true)
  })
})
