import { CONSTANTS } from '.';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
const baseURL =
  'https://ec2-13-124-18-148.ap-northeast-2.compute.amazonaws.com:5000/api/auth';

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

export const setAuthLoading = (boolean) => {
  return {
    type: CONSTANTS.AUTH_LOADING,
    payload: boolean
  };
};

export const editProfile = (userInfo, callback) => {
  return (dispatch, getState) => {
    dispatch(setAuthLoading(true));
    axios
      .put(`${baseURL}/profile`, userInfo)
      .then(() => {
        dispatch({
          type: CONSTANTS.EDIT_PROFILE,
          payload: userInfo
        });
        callback();
        dispatch(setAuthLoading(false));
      })
      .catch((err) => {
        dispatch({
          type: CONSTANTS.AUTH_ERROR
        });
        dispatch(setAuthLoading(false));
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

export const deleteAccount = () => {
  return (dispatch, getState) => {
    dispatch(setAuthLoading(true));
    axios
      .delete(`${baseURL}`)
      .then(() => {
        dispatch({
          type: CONSTANTS.LOGOUT
        });
        localStorage.removeItem('vrello_jwt');
        setAuthToken(null);
        dispatch(setAuthLoading(false));
      })
      .catch((err) => {
        alert('회원삭제 오류입니다. 다시 시도해주세요.');
        dispatch(setAuthLoading(false));
      });
  };
};

export const logout = () => {
  localStorage.removeItem('vrello_jwt');
  setAuthToken(null);
  return {
    type: CONSTANTS.LOGOUT
  };
};
