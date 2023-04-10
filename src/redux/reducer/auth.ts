/* eslint-disable indent */
import ACTION_TYPE from '../type';
import { actionType } from 'src/features/Login/types';

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
