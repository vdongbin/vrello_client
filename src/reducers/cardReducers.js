import { CONSTANTS } from '../actions';

const initialState = {};

const cardReducers = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_DATA: {
      const dataObj = {};
      action.payload.cards.forEach((e) => {
        dataObj[e._id] = {
          id: e._id,
          listID: e.listId,
          text: e.text
        };
      });
      state = { ...dataObj };
      return state;
    }

    case CONSTANTS.ADD_CARD: {
      const { text, listID, id } = action.payload;

      const newCard = {
        text,
        id: id,
        listID: listID
      };

      return { ...state, [id]: newCard };
    }

    case CONSTANTS.EDIT_CARD: {
      const { id, newText } = action.payload;
      const card = state[id];
      card.text = newText;
      return { ...state, [id]: card };
    }

    case CONSTANTS.DELETE_CARD: {
      const { id } = action.payload;
      delete state[id];
      return { ...state };
    }

    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      for (let key in state) {
        if (state[key].listID === listID) {
          delete state[key];
        }
      }
      return { ...state };
    }

    case CONSTANTS.DRAG_CARD: {
      const { droppableIdEnd, draggableId } = action.payload;

      state[draggableId].listID = droppableIdEnd;

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

export default cardReducers;
