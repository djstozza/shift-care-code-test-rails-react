import * as actions from './actions'

const startTime = '2021-11-01T03:02:19Z'
const endTime = '2021-11-01T07:01:23Z'
const plumberId = '5'

describe('Jobs actions', () => {
  test('initializeJobForm', () => {
    expect(actions.initializeJobForm()).toEqual({ type: actions.INITIALIZE_JOB_FORM })
  })

  test('fetchJobs', () => {
    expect(actions.fetchJobs({ startTime, endTime }))
      .toEqual({ type: actions.API_JOBS_INDEX, startTime, endTime })

    expect(actions.fetchJobs({ startTime, endTime, plumberId }))
      .toEqual({ type: actions.API_JOBS_INDEX, startTime, endTime, plumberId })
  })

  test('createJob', () => {
    const job = {
      clientId: '1',
      startTime,
      endTime,
      plumberIds: ['4', '20']
    }
    expect(actions.createJob({ job })).toEqual({ type: actions.API_JOBS_CREATE, job })
  })
})
