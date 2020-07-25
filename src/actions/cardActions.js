import { CONSTANTS } from '../actions';
import axios from 'axios';
const baseURL = 'http://localhost:5000/api/card';

export const addCard = (listID, text) => {
  return (dispatch) => {
    axios
      .post(`${baseURL}`, {
        text,
        listID
      })
      .then((res) => {
        const id = res.data._id;
        dispatch({
          type: CONSTANTS.ADD_CARD,
          payload: { text, listID, id }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editCard = (id, listID, newText) => {
  return (dispatch) => {
    axios
      .put(`${baseURL}`, {
        text: newText,
        cardID: id
      })
      .then(() => {
        dispatch({
          type: CONSTANTS.EDIT_CARD,
          payload: { id, listID, newText }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteCard = (id, listID) => {
  return (dispatch) => {
    axios
      .delete(`${baseURL}`, {
        data: {
          listID,
          cardID: id
        }
      })
      .then(() => {
        dispatch({
          type: CONSTANTS.DELETE_CARD,
          payload: { id, listID }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
