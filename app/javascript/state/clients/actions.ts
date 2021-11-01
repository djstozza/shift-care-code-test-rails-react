export const INITIALIZE_CLIENT_FORM = 'INITIALIZE_CLIENT_FORM'
export const API_CLIENTS_INDEX = 'API_CLIENTS_INDEX'
export const API_CLIENTS_CREATE = 'API_CLIENTS_CREATE'

type ClientProps = {
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
  privateNote?: string,
  addressLine1: string,
  addressLine2?: string,
  suburb: string,
  state: string,
  postCode: string,
  country: string
}

export const initializeClientForm = () => ({ type: INITIALIZE_CLIENT_FORM })
export const fetchClients = () => ({ type: API_CLIENTS_INDEX })
export const createClient = ({ client }: ClientProps) => ({ type: API_CLIENTS_CREATE, client })
