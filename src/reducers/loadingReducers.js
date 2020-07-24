import { CONSTANTS } from '../actions';

const initialState = false;

const loadingReducers = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_LOADING: {
      console.log(action.payload);
      return action.payload;
    }

    default:
      return state;
  }
};

export default loadingReducers;
