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

    default:
      return state;
  }
};

export default boardReducers;
