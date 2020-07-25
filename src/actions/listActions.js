import { CONSTANTS } from '../actions';
import axios from 'axios';
const baseURL = 'http://localhost:5000/api/list';

export const addList = (title) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    axios
      .post(`${baseURL}`, {
        title,
        boardID
      })
      .then((res) => {
        const { _id } = res.data;
        dispatch({
          type: CONSTANTS.ADD_LIST,
          payload: { title, boardID, id: _id }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// export const addList = (title) => {
//   return (dispatch, getState) => {
//     const boardID = getState().activeBoard;
//     const beforeId = uuidv4();
//     dispatch({
//       type: CONSTANTS.ADD_LIST,
//       payload: { title, boardID, id: beforeId }
//     });
//     axios
//       .post(`${baseURL}`, {
//         title,
//         boardID
//       })
//       .then((res) => {
//         const { _id } = res.data;
//         dispatch({
//           type: CONSTANTS.ADD_LIST_AFTER,
//           payload: { title, boardID, id: _id, beforeId }
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

export const dragAndDrop = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    if (type === 'list') {
      if (droppableIndexStart === droppableIndexEnd) {
        return;
      }
      dispatch({
        type: CONSTANTS.DRAG_LIST,
        payload: {
          droppableIndexStart, // start list index
          droppableIndexEnd, // end list index
          boardID // board id
        }
      });

      axios
        .post(`${baseURL}/swap`, {
          droppableIndexStart,
          droppableIndexEnd,
          boardID,
          draggableId
        })
        .then(() => {
          console.log('success');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (
        droppableIdStart === droppableIdEnd &&
        droppableIndexEnd === droppableIndexStart
      ) {
        return;
      }
      dispatch({
        type: CONSTANTS.DRAG_CARD,
        payload: {
          droppableIdStart, // start list id
          droppableIdEnd, // end list id
          droppableIndexEnd, // start index
          droppableIndexStart, // end index
          draggableId
        }
      });

      axios
        .post('http://localhost:5000/api/card/swap', {
          droppableIdStart,
          droppableIdEnd,
          droppableIndexEnd,
          droppableIndexStart,
          draggableId
        })
        .then(() => {
          console.log('success');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};

export const editTitle = (listID, newTitle) => {
  return (dispatch, getState) => {
    axios
      .put(`${baseURL}`, {
        listID,
        title: newTitle
      })
      .then(() => {
        dispatch({
          type: CONSTANTS.EDIT_LIST,
          payload: {
            listID,
            newTitle
          }
        });
      });
  };
};

export const deleteList = (listID) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    axios
      .delete(`${baseURL}`, {
        data: {
          listID,
          boardID
        }
      })
      .then(() => {
        dispatch({
          type: CONSTANTS.DELETE_LIST,
          payload: {
            listID,
            boardID
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
