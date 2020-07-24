import { combineReducers } from 'redux';
import authReducers from './authReducers';
import boardReducers from './boardReducers';
import boardArrayReducers from './boardArrayReducers';
export default combineReducers({
  auth: authReducers,
  boards: boardReducers,
  boardArrays: boardArrayReducers
});
