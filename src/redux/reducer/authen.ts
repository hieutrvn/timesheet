/* eslint-disable indent */
import { actionType } from 'src/features/ProjectManagement/type';
import ACTION_TYPE from '../type';
const initialState = {
  profile: null
};
const authReducer = (state = initialState, { type, payload }: actionType): Object => {
  switch (type) {
    case ACTION_TYPE.PROFILE:
      return {
        ...state,
        profile: payload
      };
    default:
      return { ...state };
  }
};
export default authReducer;
