export const INITIALIZE_PLUMBER_FORM = 'INITIALIZE_PLUMBER_FORM'
export const API_PLUMBERS_INDEX = 'API_PLUMBERS_INDEX'
export const API_PLUMBERS_CREATE = 'API_PLUMBERS_CREATE'

type PlumberProps = {
  firstName: string,
  lastName: string,
  email: string,
  addressLine1: string,
  addressLine2?: string,
  suburb: string,
  state: string,
  postCode: string,
  country: string
}

export const initializePlumberForm = () => ({ type: INITIALIZE_PLUMBER_FORM })
export const fetchPlumbers = () => ({ type: API_PLUMBERS_INDEX })
export const createPlumber = ({ plumber }: PlumberProps) => ({ type: API_PLUMBERS_CREATE, plumber })
