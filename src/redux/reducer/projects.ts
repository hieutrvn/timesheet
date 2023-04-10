/* eslint-disable indent */
import { actionType } from 'src/features/ProjectManagement/type';
import ACTION_TYPE from '../type';
const initialState = {
  projects: [],
  quantity: [],
  timesheetStatisticTasks: [],
  timesheetStatisticTeams: [],
  clients: [],
  users: [],
  allBranchFilter: [],
  tasks: [],
  infoProject: {}
};

const projectReducer = (state = initialState, { type, payload }: actionType): Object => {
  switch (type) {
    case ACTION_TYPE.GET_PROJECTS:
      return {
        ...state,
        projects: payload
      };
    case ACTION_TYPE.GET_QUANTITY_PROJECT:
      return {
        ...state,
        quantity: payload
      };
    case ACTION_TYPE.GET_TIMESHEET_STATISTIC_TASKS:
      return {
        ...state,
        timesheetStatisticTasks: payload
      };
    case ACTION_TYPE.GET_TIMESHEET_STATISTIC_TEAMS:
      return {
        ...state,
        timesheetStatisticTeams: payload
      };

    default:
      return { ...state };
  }
};
export default projectReducer;
