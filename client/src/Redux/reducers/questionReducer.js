import {
  ADD_QUESTION,
  DEL_QUESTION,
  ADD_QUESTIONS
} from '../types';

const questionReducer = (state = { title: 'example', description: '' }, action) => {
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
