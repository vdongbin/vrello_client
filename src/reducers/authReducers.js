import { CONSTANTS } from '../actions';

const initialState = {
  isAuthenticated: false,
  userInfo: {},
  error: false
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_USER: {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      return { ...state };
    }

    case CONSTANTS.AUTH_ERROR: {
      state.error = true;
      return { ...state };
    }

    case CONSTANTS.CLEAN_ERROR: {
      state.error = false;
      return { ...state };
    }

    default:
      return state;
  }
};

export default authReducers;
