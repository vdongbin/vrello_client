import { combineReducers } from 'redux';
import authReducers from './authReducers';
import boardReducers from './boardReducers';
import boardArrayReducers from './boardArrayReducers';
import activeBoardReducers from './activeBoardReducers';
import loadingReducers from './loadingReducers';

export default combineReducers({
  auth: authReducers,
  boards: boardReducers,
  boardArrays: boardArrayReducers,
  activeBoard: activeBoardReducers,
  loading: loadingReducers
});
