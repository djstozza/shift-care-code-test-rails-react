export const INITIALIZE_JOB_FORM = 'INITIALIZE_JOB_FORM'
export const API_JOBS_INDEX = 'API_JOBS_INDEX'
export const API_JOBS_CREATE = 'API_JOBS_CREATE'
export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE'

type JobProps = {
  clientId: string,
  plumberIds: string[],
  startTime: string,
  endTime: string
}

type FetchJobProps = {
  startTime: string,
  view: string,
  plumberId?: string
}

export const initializeJobForm = () => ({ type: INITIALIZE_JOB_FORM })
export const fetchJobs = ({ startTime, view, plumberId }: FetchJobProps) =>
  ({ type: API_JOBS_INDEX, startTime, plumberId })
export const createJob = ({ job }: JobProps) => ({ type: API_JOBS_CREATE, job })
export const updateSchedule = ({ startTime, view, plumberId }: FetchJobProps) =>
  ({ type: UPDATE_SCHEDULE, startTime, view, plumberId })
