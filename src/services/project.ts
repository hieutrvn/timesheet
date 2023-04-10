import requester from './api';
import apiPath from './apiPath';

export const getProjects = (status: number, search: string): any => {
  const projectStatus = status !== 2 ? status : null;
  return requester.get(`${apiPath.GET_PROJECTS}`, { params: { status: projectStatus, search } });
};
export const deleteProject = (id: number): any => {
  return requester.delete(`${apiPath.DELETE_PROJECT}`, { params: { Id: id } });
};
export const activeProject = (id: number): any => requester.post(`${apiPath.ACTIVE_PROJECT}`, { id });
export const deactiveProject = (id: number): any => requester.post(`${apiPath.DEACTIVE_PROJECT}`, { id });
export const getQuantityProject = (): any => requester.get(apiPath.GET_QUANTITY_PROJECT);
export const getTimeSheetStatisticTasks = (projectId: number, startDate: string, endDate: string): any => {
  return requester.get(`${apiPath.GET_TIMESHEET_STATISTIC_TASKS}`, { params: { projectId, startDate, endDate } });
};
export const getTimeSheetStatisticTeams = (projectId: number, startDate: string, endDate: string): any => {
  return requester.get(`${apiPath.GET_TIMESHEET_STATISTIC_TEAMS}`, { params: { projectId, startDate, endDate } });
};
