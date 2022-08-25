import {
  ADD_QUESTION,
  ADD_QUESTIONS,
  DEL_QUESTION,
} from '../types';

const questionReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_QUESTIONS:
      return payload;
    case ADD_QUESTION:
      return [...state, payload];
    case DEL_QUESTION:
      return state.filter((el) => el.id !== payload);
    default:
      return state;
  }
};

export default questionReducer;
