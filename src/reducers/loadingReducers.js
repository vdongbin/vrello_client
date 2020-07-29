import { CONSTANTS } from '../actions';

const initialState = false;

const loadingReducers = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_LOADING: {
      return action.payload;
    }

    case CONSTANTS.LOGOUT: {
      state = { ...initialState };
      return state;
    }

    default:
      return state;
  }
};

export default loadingReducers;
