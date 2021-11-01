export type QueryParam = { [key: string]: string | string[] } | string | string[]

export type Query = {
  [key: string]: QueryParam
}

export type Admin = {
  email: string,
  firstName: string,
  lastName: string
}

export type BaseResource = {
  firstName: string,
  lastName: string,
  email: string
}

export type ClientBase = {
  dateOfBirth: string,
  privateNote?: string
} & BaseResource

export type Address = {
  addressLine1: string,
  addressLine2?: string,
  suburb: string,
  state: string,
  postCode: string,
  country: string
}

export type Client = {
  address: Address
} & ClientBase

export type Vehicle = {
  make: string,
  model: string,
  numberPlate: string,
  otherMake?: string,
  year: number
}

export type Plumber = {
  address: Address
  vehicles: Vehicle[]
} & BaseResource

export type Error = {
  status: string,
  code: string,
  title: string,
  detail: string,
  source: string
}
