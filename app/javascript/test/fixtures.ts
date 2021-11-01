export const ADMIN_1 = {
  email: 'admin1@example.com',
  firstName: 'Admin 1',
  lastName: 'User 1'
}

export const CLIENT_BASE_1 = {
  id: '12',
  firstName: 'Walter',
  lastName: 'White',
  dateOfBirth: '07/09/1958',
  email: 'say_my_name@heisenberg.com'
}

export const ADDRESS_1 = {
  addressLine1: '308 Negra Arroyo Lane',
  suburb: 'Albuquerque',
  postCode: '87104',
  state: 'NM',
  country: 'USA'
}

export const CLIENT_1 = {
  address: ADDRESS_1
} & CLIENT_BASE_1


export const CLIENT_BASE_2 = {
  id: '34',
  firstName: 'Jerry',
  lastName: 'Seinfeld',
  dateOfBirth: '1954-04-29',
  email: 'yada_yada_yada@seinfeld.com'
}

export const ADDRESS_2 = {
  addressLine1: '129 West 81st Street',
  addressLine2: '5A',
  suburb: 'New York',
  postCode: '10024',
  state: 'NY',
  country: 'USA'
}

export const CLIENT_2 = {
  address: ADDRESS_2
} & CLIENT_BASE_2

export const BASE_CLIENTS = [
  CLIENT_BASE_1,
  CLIENT_BASE_2
]

export const PLUMBER_BASE_1 = {
  id: '58',
  firstName: 'Tony',
  lastName: 'Soprano',
  email: 'gabagool@soprano.com'
}

export const ADDRESS_3 = {
  addressLine1: '14 Aspen Dr',
  suburb: 'Caldwell',
  state: 'NJ',
  postCode: '07006',
  country: 'USA'
}

export const PLUMBER_BASE_2 = {
  id: '79',
  firstName: 'Sherlock',
  lastName: 'Holmes',
  email: 'elementary@watson.com'
}

export const BASE_PLUMBERS = [
  PLUMBER_BASE_1,
  PLUMBER_BASE_2
]

export const JOBS = [
  {
    startTime: '2021-11-01T03:02:19Z',
    endTime: '2021-11-01T07:01:23Z',
    client: CLIENT_1,
    plumbers: [PLUMBER_BASE_1]
  },
  {
    startTime: '2021-11-01T06:07:21Z',
    endTime: '2021-11-01T10:07:39Z',
    client: CLIENT_2,
    plumbers: [PLUMBER_BASE_2]
  }
]
