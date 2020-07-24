import { CONSTANTS } from '.';
import axios from 'axios';
const baseURL = 'http://localhost:5000/api/board';
export const addBoard = (title) => {
  console.log(title);
  return (dispatch, getState) => {
    axios
      .post(`${baseURL}`, {
        title
      })
      .then((res) => {
        console.log(res);
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
