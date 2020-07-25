import { CONSTANTS } from '.';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
const baseURL = 'http://localhost:5000/api/auth';

export const login = (userInfo) => {
  return (dispatch, getState) => {
    axios
      .post(`${baseURL}`, userInfo)
      .then((res) => {
        const { token, userInfo } = res.data;
        localStorage.setItem('vrello_jwt', token);
        setAuthToken(token);
        dispatch({
          type: CONSTANTS.SET_USER,
          payload: userInfo
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

export const checkData = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CONSTANTS.GET_DATA
    });
  };
};
