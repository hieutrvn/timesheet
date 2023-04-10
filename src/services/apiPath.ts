const apiPath = {
  LOGIN: '/api/TokenAuth/Authenticate',
  PROFILE: '/api/services/app/Session/GetCurrentLoginInformations',
  GET_PROJECTS: '/api/services/app/Project/GetAll',
  DELETE_PROJECT: '/api/services/app/Project/Delete',
  ACTIVE_PROJECT: '/api/services/app/Project/Active',
  DEACTIVE_PROJECT: '/api/services/app/Project/Inactive',
  GET_QUANTITY_PROJECT: '/api/services/app/Project/GetQuantityProject',
  GET_TIMESHEET_STATISTIC_TASKS: '/api/services/app/TimeSheetProject/GetTimeSheetStatisticTasks',
  GET_TIMESHEET_STATISTIC_TEAMS: '/api/services/app/TimeSheetProject/GetTimeSheetStatisticTeams'

};

export default apiPath;
