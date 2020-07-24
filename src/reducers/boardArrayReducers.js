import { CONSTANTS } from '../actions';
const initialState = [];

const boardOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_BOARD: {
      return [...state, action.payload._id];
    }
    default:
      return state;
  }
};

export default boardOrderReducer;
