import { CONSTANTS } from '.';
import axios from 'axios';
const baseURL = 'http://localhost:5000/api/board';

export const addBoard = (title) => {
  return (dispatch) => {
    axios
      .post(`${baseURL}`, {
        title
      })
      .then((res) => {
        dispatch({
          type: CONSTANTS.ADD_BOARD,
          payload: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setActiveBoard = (id) => {
  return {
    type: CONSTANTS.SET_ACTIVE_BOARD,
    payload: id
  };
};

export const setLoading = (boolean) => {
  return {
    type: CONSTANTS.SET_LOADING,
    payload: boolean
  };
};

export const getData = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .get(`${baseURL}`)
      .then((res) => {
        dispatch({
          type: CONSTANTS.GET_DATA,
          payload: res.data
        });
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
