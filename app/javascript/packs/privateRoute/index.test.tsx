import React from 'react'
import { mount } from 'enzyme'

import ConnectedPrivateRoute, { PrivateRoute } from '.'
import { MockedRouterStore, blank__ } from 'test/helpers'
import { LOGIN_URL } from 'utilities/constants'
import { ADMIN_1 } from 'test/fixtures'

describe('PrivateRoute', () => {
  const render = (props = {}, state = {}) => mount(
    <MockedRouterStore defaultState={{ auth: { admin: null }, ...state }}>
      <PrivateRoute
        updateSession={blank__}
        {...props}
      >
        <div>
          Child component
        </div>
      </PrivateRoute>
    </MockedRouterStore>
  )

  const connectedRender = (state = {}) => mount(
    <MockedRouterStore defaultState={{ auth: { admin: null }, ...state }}>
      <ConnectedPrivateRoute>
        <div>
          Child component
        </div>
      </ConnectedPrivateRoute>
    </MockedRouterStore>
  )

  it('redirects to the loginPage if there is no admin', () => {
    expect(window.location.pathname).toEqual('/')

    const wrapper = render()

    expect(wrapper.find('Redirect').props().to).toEqual(LOGIN_URL)
    expect(window.location.pathname).toEqual(LOGIN_URL)
  })

  it('renders the component if the admin is present', () => {
    const updateSession = jest.fn()
    const wrapper = render({ admin: ADMIN_1, updateSession }, { auth: { admin: ADMIN_1 } })

    expect(wrapper.text()).toEqual('Child component')
    expect(updateSession).toHaveBeenCalled()
  })

  it('renders the connected component', () => {
    const wrapper = connectedRender({ auth: { admin: ADMIN_1 } })

    expect(wrapper.text()).toEqual('Child component')
  })
})
