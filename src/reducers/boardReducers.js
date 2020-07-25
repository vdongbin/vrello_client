import { CONSTANTS } from '../actions';

const initialState = {};

const boardReducers = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_BOARD: {
      const { title, _id, lists } = action.payload;
      const newBoard = {
        id: _id,
        title,
        lists
      };
      return { ...state, [_id]: newBoard };
    }

    case CONSTANTS.GET_DATA: {
      const dataObj = {};
      action.payload.forEach((e) => {
        dataObj[e._id] = {
          id: e._id,
          lists: e.lists,
          title: e.title
        };
      });
      state = { ...dataObj };
      return state;
    }

    case CONSTANTS.ADD_LIST: {
      const { boardID, id } = action.payload;
      const board = state[boardID];
      const newListID = id;
      const newLists = [...board.lists, newListID];
      board.lists = newLists;
      return { ...state, [boardID]: board };
    }

    case CONSTANTS.ADD_LIST_AFTER: {
      const { boardID, beforeId, id } = action.payload;
      const board = state[boardID];
      const newListID = id;
      const newLists = [
        ...board.lists.filter((e) => e !== beforeId),
        newListID
      ];
      board.lists = newLists;
      return { ...state, [boardID]: board };
    }

    case CONSTANTS.DELETE_LIST: {
      const { listID, boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const newLists = lists.filter((id) => id !== listID);
      board.lists = newLists;
      return { ...state, [boardID]: board };
    }

    case CONSTANTS.DRAG_LIST: {
      const {
        boardID,
        droppableIndexEnd,
        droppableIndexStart
      } = action.payload;
      const board = state[boardID];
      const lists = board.lists;

      const pulledOutList = lists.splice(droppableIndexStart, 1);
      lists.splice(droppableIndexEnd, 0, ...pulledOutList);
      board.lists = lists;

      return { ...state, [boardID]: board };
    }

    default:
      return state;
  }
};

export default boardReducers;
