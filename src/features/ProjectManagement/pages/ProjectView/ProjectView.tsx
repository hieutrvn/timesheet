/* eslint-disable indent */
import React, { SyntheticEvent, useEffect, useState } from 'react';
import styles from './ProjectView.module.scss';
import TaskView from './components/TaskView/TaskView';
import TeamView from './components/TeamView/TeamView';
import FilterView from './components/FilterView/FilterView';
import { useDispatch } from 'react-redux';
import { getTimeSheetStatisticTasksAction, getTimeSheetStatisticTeamsAction } from 'src/redux/actions/projects';
import moment from 'moment';
import { SelectChangeEvent, Tabs, Tab, Typography, Box } from '@mui/material';
import Loading from 'src/components/Loading/Loading';

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
interface ProjectViewProps {
  projectId: number
}
const TabPanel = (props: TabPanelProps): JSX.Element => {
  const { children, value, index, ...other } = props;
  return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
  );
};
function ProjectView ({ projectId }: ProjectViewProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState(0);
  const [type, setType] = useState<any>('isoWeek');
  const handleChange = (event: SelectChangeEvent): void => {
    setType(event.target.value);
  };
  const handleChangeTab = (event: SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  useEffect(() => {
    if (type !== 'customTime') {
      const currentDate = moment();
      const dateStart = currentDate.clone().startOf(type);
      const dateEnd = currentDate.clone().endOf(type);
      if (type === 'allTime') {
        setStartDate('null');
        setEndDate('null');
      } else {
        setStartDate(moment(dateStart).format('DD/MM/YY'));
        setEndDate(moment(dateEnd).format('DD/MM/YY'));
      }
    }
  }, [type]);
  const dispatch = useDispatch();
  const fetchTimesheetStatistic = async (): Promise<void> => {
    const start = startDate !== 'null' ? moment(startDate, 'DD/MM/YY').format('YYYY/MM/DD') : '';
    const end = endDate !== 'null' ? moment(endDate, 'DD/MM/YY').format('YYYY/MM/DD') : '';
    if (value === 0) {
      setLoading(true);
      dispatch(await getTimeSheetStatisticTasksAction(projectId, start, end));
      setLoading(false);
    } else {
      setLoading(true);
      dispatch(await getTimeSheetStatisticTeamsAction(projectId, start, end));
      setLoading(false);
    }
  };
  useEffect(() => {
    if (startDate !== '' && endDate !== '') {
      void fetchTimesheetStatistic();
    }
  }, [dispatch, startDate, endDate, value]);

  const handleDateChange = (action: string): void => {
    if (type === 'allTime' || type === 'customTime') return;
    let newStartDate;
    let newEndDate;
    const formatDate = 'DD/MM/YY';
    const start = moment(startDate, formatDate);
    const end = moment(endDate, formatDate);
    if (action === 'minus') {
      switch (type) {
        case 'isoWeek':
          newStartDate = start.subtract(1, 'weeks').startOf('isoWeek');
          newEndDate = end.subtract(1, 'weeks').endOf('isoWeek');
          break;
        default:
          newStartDate = start.subtract(1, type).startOf(type);
          newEndDate = end.subtract(1, type).endOf(type);
      }
    } else {
      switch (type) {
        case 'isoWeek':
          newStartDate = start.add(1, 'weeks').startOf('isoWeek');
          newEndDate = end.add(1, 'weeks').endOf('isoWeek');
          break;
        default:
          newStartDate = start.add(1, type).startOf(type);
          newEndDate = end.add(1, type).endOf(type);
      }
    }
    setStartDate(moment(newStartDate).format(formatDate));
    setEndDate(moment(newEndDate).format(formatDate));
  };
  return (
        <div className={styles.projectView}>
            <FilterView handleDateChange={handleDateChange} startDate={startDate} endDate={endDate} type={type} handleChange={handleChange} setStartDate={setStartDate} setEndDate={setEndDate} />
            <div className={styles.tabs}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                            <Tab label="TASKS" />
                            <Tab label="TEAM" />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <TaskView />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TeamView />
                    </TabPanel>
                </Box>
            </div>
            {loading && <Loading />}
        </div>
  );
}

export default ProjectView;
