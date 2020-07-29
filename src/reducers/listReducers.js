import { CONSTANTS } from '../actions';

const initialState = {};

const listReducers = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_DATA: {
      const dataObj = {};
      action.payload.lists.forEach((e) => {
        dataObj[e._id] = {
          id: e._id,
          cards: e.cards,
          title: e.title
        };
      });
      state = { ...dataObj };
      return state;
    }

    case CONSTANTS.ADD_LIST: {
      const { title, id } = action.payload;
      const newList = {
        title: title,
        id: id,
        cards: []
      };

      const newState = { ...state, [id]: newList };

      return newState;
    }

    case CONSTANTS.ADD_LIST_AFTER: {
      const { beforeId, id } = action.payload;

      const list = { ...state[beforeId] };
      list['id'] = id;
      delete state[beforeId];

      const newState = { ...state, [id]: list };

      return newState;
    }

    case CONSTANTS.ADD_CARD: {
      const { listID, id } = action.payload;
      const list = state[listID];
      list.cards.push(id);
      return { ...state, [listID]: list };
    }

    case CONSTANTS.DRAG_CARD:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart
      } = action.payload;

      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
        return { ...state, [droppableIdStart]: list };
      }

      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state[droppableIdStart];
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state[droppableIdEnd];
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);

        return {
          ...state,
          [droppableIdStart]: listStart,
          [droppableIdEnd]: listEnd
        };
      }
      return state;

    case CONSTANTS.DELETE_CARD: {
      const { listID, id } = action.payload;

      const list = state[listID];
      const newCards = list.cards.filter((cardID) => cardID !== id);

      return { ...state, [listID]: { ...list, cards: newCards } };
    }

    case CONSTANTS.EDIT_LIST: {
      const { listID, newTitle } = action.payload;

      const list = state[listID];
      list.title = newTitle;
      return { ...state, [listID]: list };
    }

    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      delete state[listID];
      return { ...state };
    }

    case CONSTANTS.LOGOUT: {
      state = { ...initialState };
      return state;
    }

    default:
      return state;
  }
};

export default listReducers;
