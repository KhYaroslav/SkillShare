import {
  ADD_QUESTION,
  ADD_QUESTIONS,
  DEL_QUESTION,
  ADD_COMMENT,
  DEL_COMMENT
} from '../types';

const questionReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_QUESTION:
      return [...state, payload];
    case ADD_QUESTIONS:
      return payload;
    case DEL_QUESTION:
      return state.filter((el) => el.id !== payload);
    case ADD_COMMENT:
      return state.map((el) => {
        if (el.id === payload.post_id) {
          return { ...el, Comments: [...el.Comments, payload] };
        }
        return el;
      });
    case DEL_COMMENT:
      return state.map((el) => (
        { ...el, Comments: el?.Comments.filter((item) => item.id !== payload)
        }));
    // case 'SET_QUESTION':
    //   return payload;
    default:
      return state;
  }
};

export default questionReducer;
