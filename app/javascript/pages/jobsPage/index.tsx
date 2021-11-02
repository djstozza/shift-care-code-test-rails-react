import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { jobsActions } from 'state/jobs'
import { plumbersActions } from 'state/plumbers'
import JobScheduler from 'common/jobScheduler'
import SearchListener from 'common/searchListener'
import { initialFilterState } from 'state/jobs/reducer'

import type { Job, PlumberBase } from 'types'

type Props = {
  fetchJobs: Function,
  fetchPlumbers: () => void
  jobs: Job[],
  plumbers: Plumber[],
  fetching: boolean,
  startTime: string,
  view: string,
  updateSchedule: Function
}

export const JobsPage = (props: Props) => {
  const {
    jobs,
    plumbers,
    fetchJobs,
    fetchPlumbers,
    fetching,
    startTime,
    view,
    updateSchedule
  } = props

  useEffect(() => {
    fetchPlumbers()
  }, [fetchPlumbers])

  return (
    <SearchListener fetchAction={fetchJobs} initialFilterState={initialFilterState}>
      <JobScheduler
        jobs={jobs}
        fetching={fetching}
        startTime={startTime}
        view={view}
        updateSchedule={updateSchedule}
      />
    </SearchListener>
  )
}

const mapStateToProps = ({
  jobs: { data: jobs, fetching, startTime, view },
  plumbers: { data: plumbers }
}) => ({
  plumbers,
  jobs,
  fetching,
  startTime,
  view
})

const matchDispatchToProps = {
  fetchJobs: jobsActions.fetchJobs,
  fetchPlumbers: plumbersActions.fetchPlumbers,
  updateSchedule: jobsActions.updateSchedule
}

export default connect(mapStateToProps, matchDispatchToProps)(JobsPage)
