import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import {
  ViewState,
} from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui'
import { useLocation } from 'react-router-dom'
import qs from 'qs'
import moment from 'moment'

import { capitalize } from 'utilities/helpers'

const styles = {
  toolbarRoot: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
};

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>
        {children}
      </Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  ),
);
const JobScheduler = (props) => {
  const { jobs, fetching, startTime, view = 'Week', updateSchedule } = props
  const { search } = useLocation()

  const { view: urlView, startTime: urlStartTime } = qs.parse(search)
  const currentViewName = capitalize(urlView || view)
  const currentStartTime = urlStartTime || startTime
  const data = jobs.map(({ startTime, endTime, client: { firstName, lastName },  ...rest }) => ({
    title: `${firstName} ${lastName}`,
    startDate: startTime,
    endDate: endTime,
    ...rest
  }))

  return (
    <Paper>
      <Scheduler
        data={data}
      >
        <ViewState
          currentDate={currentStartTime}
          currentViewName={currentViewName}
          onCurrentViewNameChange={(newView) => {
            updateSchedule({ view: newView, startTime: moment(currentStartTime).startOf(newView).toISOString() })
          }}
          onCurrentDateChange={(newStartTime) => {
            updateSchedule({
              startTime: moment(newStartTime).startOf(currentViewName).toISOString(),
              view: currentViewName
            })
          }}
        />
        <DayView />
        <WeekView />
        <Appointments />
        <Toolbar
          {...fetching ? { rootComponent: ToolbarWithLoading } : null}
        />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentTooltip
          showOpenButton
          showCloseButton
        />
        <AppointmentForm readOnly />
      </Scheduler>
    </Paper>
  )
}

export default JobScheduler
