import * as React from 'react'
import {
  makeStyles,
  Theme,
  LinearProgress,
  Paper
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import classnames from 'classnames'
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
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui'
import { useLocation } from 'react-router-dom'
import qs from 'qs'
import moment from 'moment'

import { capitalize } from 'utilities/helpers'

const useStyles = makeStyles((theme: Theme) => ({
  toolbarRoot: {
    position: 'relative'
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0
  },
  listContainer: {
    paddingLeft: theme.spacing(2),
    marginTop: 0
  },
  listItem: {
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  }
}))

const ToolbarWithLoading = ({ children, ...restProps }) => {
  const classes = useStyles()

  return (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>
        {children}
      </Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  )
}

const AppointmentContent = ({ data, ...restProps }) =>  {
  const classes = useStyles()

  return (
    <Appointments.AppointmentContent {...restProps} data={data}>
      <div className={classes.container}>
        <div className={classes.text}>
          {data.title}
        </div>

        <div>
          Plumbers:
          <ul className={classes.listContainer}>
            {
              data.plumbers.map(({ firstName, lastName}) => (
                <li className={classes.listItem}>{firstName} {lastName}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </Appointments.AppointmentContent>
  );
}

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
        <Appointments
          appointmentContentComponent={AppointmentContent}
        />

        <Toolbar
          {...fetching ? { rootComponent: ToolbarWithLoading } : null}
        />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentTooltip
          showCloseButton
        />
        <AppointmentForm readOnly />
      </Scheduler>
    </Paper>
  )
}

export default JobScheduler
