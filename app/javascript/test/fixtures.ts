export const ADMIN_1 = {
  email: 'admin1@example.com',
  firstName: 'Admin 1',
  lastName: 'User 1'
}

export const CLIENT_BASE_1 = {
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
