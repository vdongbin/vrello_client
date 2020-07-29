import { CONSTANTS } from '../actions';
const initialState = [];

const boardOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_DATA: {
      const dataArray = [];
      action.payload.boards.forEach((e) => {
        dataArray.push(e._id);
      });
      state = [...dataArray];
      return state;
    }

    case CONSTANTS.DELETE_BOARD: {
      const newState = state.filter((e) => e !== action.payload);
      return [...newState];
    }

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

    case CONSTANTS.LOGOUT: {
      state = { ...initialState };
      return state;
    }

    default:
      return state;
  }
};

export default boardOrderReducer;
