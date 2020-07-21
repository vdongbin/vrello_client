import { CONSTANTS } from '../actions';

export const login = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CONSTANTS.LOGIN,
      payload: {}
    });
  };
};

export const signup = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CONSTANTS.SIGNUP,
      payload: {}
    });
  };
};
