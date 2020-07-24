import { CONSTANTS } from '../actions';

const initialState = {};

const boardReducers = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_BOARD: {
      const { title, _id, lists } = action.payload;
      const newBoard = {
        id: _id,
        title,
        lists
      };
      return { ...state, [_id]: newBoard };
    }

    case CONSTANTS.GET_DATA: {
      const dataObj = {};
      action.payload.forEach((e) => {
        dataObj[e._id] = {
          id: e._id,
          lists: e.lists,
          title: e.title
        };
      });
      state = { ...dataObj };
      return state;
    }

    default:
      return state;
  }
};

export default boardReducers;
