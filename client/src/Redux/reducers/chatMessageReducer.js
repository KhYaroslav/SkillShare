import { ADD_CHAT_MESSAGE, ADD_CHAT_MESSAGES } from '../types';

const chatMessageReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT_MESSAGE:
      return [...state, payload];
    case ADD_CHAT_MESSAGES:
      return payload;
    default:
      return state;
  }
};

export default chatMessageReducer;
