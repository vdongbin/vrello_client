import { CONSTANTS } from '.';
import axios from 'axios';
const baseURL = 'http://localhost:5000/api/auth';

export const login = (userInfo) => {
  return (dispatch, getState) => {
    axios
      .post(`${baseURL}`, userInfo)
      .then((res) => {
        dispatch({
          type: CONSTANTS.SET_USER,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: CONSTANTS.AUTH_ERROR
        });
      });
  };
};

export const signup = (userInfo, history) => {
  return (dispatch, getState) => {
    axios
      .post(`${baseURL}/user`, userInfo)
      .then((res) => {
        alert(`${userInfo.username}님, 안녕하세요. 회원가입이 완료되었습니다.`);
        history.push('/login');
      })
      .catch((err) => {
        dispatch({
          type: CONSTANTS.AUTH_ERROR
        });
      });
  };
};

export const cleanError = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CONSTANTS.CLEAN_ERROR
    });
  };
};
