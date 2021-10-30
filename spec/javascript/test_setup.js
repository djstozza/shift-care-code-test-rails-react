import '@testing-library/jest-dom'

import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })
