import { CONSTANTS } from '../actions';

const initialState = {
  isAuthenticated: true,
  userInfo: {}
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.LOGIN_SUCCESS: {
      const { userInfo } = action.payload;
      state.isAuthenticated = true;
      state.userInfo = userInfo;
      return state;
    }

    case CONSTANTS.LOGIN_FAIL: {
      state.isAuthenticated = false;
      state.userInfo = {};
      return state;
    }

    default:
      return state;
  }
};

export default authReducers;
