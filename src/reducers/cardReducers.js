import { CONSTANTS } from '../actions';

const initialState = {};

const cardReducers = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD: {
      const { text, listID, id } = action.payload;

      const newCard = {
        text,
        id: id,
        list: listID
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
        if (state[key].list === listID) {
          delete state[key];
        }
      }
      return { ...state };
    }

    default:
      return state;
  }
};

export default cardReducers;
