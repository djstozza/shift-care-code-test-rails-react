export type QueryParam = { [key: string]: string | string[] } | string | string[]

export type Query = {
  [key: string]: QueryParam
}

export type Admin = {
  email: string,
  firstName: string,
  lastName: string
}

export type ClientBase = {
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
  privateNote?: string
}

export type Address = {
  addressLine1: string,
  addressLine2?: string,
  suburb: string,
  state: string,
  postCode: string,
  country: string
}

export type Error = {
  status: string,
  code: string,
  title: string,
  detail: string,
  source: string
}
