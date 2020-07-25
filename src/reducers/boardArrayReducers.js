import { CONSTANTS } from '../actions';
const initialState = [];

const boardOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_BOARD: {
      return [...state, action.payload._id];
    }

    case CONSTANTS.GET_DATA: {
      const array = [];

      action.payload.forEach((e) => {
        array.push(e._id);
      });
      state = [...array];

      return state;
    }

    default:
      return state;
  }
};

export default boardOrderReducer;
