import { combineReducers } from 'redux';
import authReducers from './authReducers';
import boardReducers from './boardReducers';
import boardArrayReducers from './boardArrayReducers';
import activeBoardReducers from './activeBoardReducers';
import loadingReducers from './loadingReducers';
import listReducers from './listReducers';
import cardReducers from './cardReducers';

export default combineReducers({
  auth: authReducers,
  boards: boardReducers,
  boardArrays: boardArrayReducers,
  activeBoard: activeBoardReducers,
  loading: loadingReducers,
  lists: listReducers,
  cards: cardReducers
});
