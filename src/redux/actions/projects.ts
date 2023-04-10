import { getProjects, getQuantityProject, getTimeSheetStatisticTasks, getTimeSheetStatisticTeams } from 'src/services/project';
import ACTION_TYPE from '../type';
import { actionType } from 'src/features/ProjectManagement/type';

export const getProjectList = async (status: number, search: string): Promise<actionType> => {
  const res = await getProjects(status, search);
  return {
    type: ACTION_TYPE.GET_PROJECTS,
    payload: res.data.result
  };
};
export const getQuantityProjectAction = async (): Promise<actionType> => {
  const res = await getQuantityProject();
  return {
    type: ACTION_TYPE.GET_QUANTITY_PROJECT,
    payload: res.data.result
  };
};
export const getTimeSheetStatisticTasksAction = async (projectId: number, startDate: string, endDate: string): Promise<actionType> => {
  const res = await getTimeSheetStatisticTasks(projectId, startDate, endDate);
  return {
    type: ACTION_TYPE.GET_TIMESHEET_STATISTIC_TASKS,
    payload: res.data.result
  };
};
export const getTimeSheetStatisticTeamsAction = async (projectId: number, startDate: string, endDate: string): Promise<actionType> => {
  const res = await getTimeSheetStatisticTeams(projectId, startDate, endDate);
  return {
    type: ACTION_TYPE.GET_TIMESHEET_STATISTIC_TEAMS,
    payload: res.data.result
  };
};
