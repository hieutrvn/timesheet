import requester from './api';
import apiPath from './apiPath';

export const login = (useLogin: object): any => requester.post(apiPath.LOGIN, useLogin);
export const getProfile = (): any => requester.get(apiPath.PROFILE);
