export const INITIALIZE_JOB_FORM = 'INITIALIZE_JOB_FORM'
export const API_JOBS_INDEX = 'API_JOBS_INDEX'
export const API_JOBS_CREATE = 'API_JOBS_CREATE'

type JobProps = {
  clientId: string,
  plumberIds: string[],
  startTime: string,
  endTime: string
}

type FetchJobProps = {
  startTime: string,
  endTime: string,
  plumberId?: string
}

export const initializeJobForm = () => ({ type: INITIALIZE_JOB_FORM })
export const fetchJobs = ({ startTime, endTime, plumberId }: FetchJobProps) =>
  ({ type: API_JOBS_INDEX, startTime, endTime, plumberId })
export const createJob = ({ job }: JobProps) => ({ type: API_JOBS_CREATE, job })
