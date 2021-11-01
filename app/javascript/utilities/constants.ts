export const API_URL = '/api'
export const LOGIN_URL = '/login'
export const JOBS_URL = '/jobs'
export const CLIENTS_URL = '/clients'
export const PLUMBERS_URL = '/plumbers'
export const API_SESSIONS_PATH = '/sessions'

export const APPLICATION_ERRORS = {
  '404': {
    description: 'Not Found',
    title: 'Requested resource not found',
    message: 'We couldn’t find what you’re looking for.',
    action: {
      label: 'Back Home',
      path: '/'
    }
  },
  '429': {
    description: 'Too Many Requests',
    title: 'Too many requests',
    message: 'Please try again after {retryAfter} seconds.',
    action: {
      label: 'OK'
    }
  },
  '500': {
    description: 'Internal Server Error',
    title: 'Oops, something went wrong',
    message: 'Something went wrong. The team has been alerted.',
    action: {
      label: 'OK'
    }
  },
  '502': {
    description: 'Bad Gateway',
    title: 'Service Unavailable',
    message: 'The service is temporarily unavailable. Please try again later.',
    action: {
      label: 'OK'
    }
  },
  '503': {
    description: 'Service Unavailable',
    title: 'Service Unavailable',
    message: 'The service is temporarily unavailable. Please try again later.',
    action: {
      label: 'OK'
    }
  },
  'failed_to_fetch': {
    description: 'Service Unavailable',
    title: 'Service Unavailable',
    message: 'The service is temporarily unavailable. Please try again later.',
    action: {
      label: 'OK'
    }
  }
}
