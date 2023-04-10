import ACTION_TYPE from '../type';
import { getProfile, login } from 'src/services/auth';
import { actionType } from 'src/features/Login/types';

export const loginAction = async (userLogin: object): Promise<actionType> => {
  const res = await login(userLogin);
  localStorage.setItem('token', res.data.result.accessToken);
  return {
    type: ACTION_TYPE.LOGIN,
    payload: res.data.result
  };
};
export const fetchProfile = async (): Promise<actionType> => {
  const res = await getProfile();
  return {
    type: ACTION_TYPE.PROFILE,
    payload: res.data.result.user
  };
};
export const logoutAction = async (): Promise<actionType> => {
  localStorage.removeItem('token');
  return {
    type: ACTION_TYPE.PROFILE,
    payload: null
  };
};
