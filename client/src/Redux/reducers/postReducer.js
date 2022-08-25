import { ADD_POSTS, ADD_POST, DEL_POST, ADD_LIKE, FAVORITE_POST, ADD_COMMENT, DEL_COMMENT } from '../types';

const postReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_POSTS:
      return payload;
    case ADD_POST:
      return [...state, payload];
    case DEL_POST:
      return state.filter((el) => el.id !== payload);
    case ADD_LIKE:
      return state.map((el) => {
        if (el.id === payload.id) {
          return { ...payload };// сделать на комменты
        }
        return { ...el };
      });
    case FAVORITE_POST:
      return state.map((el) => {
        if (el.id === payload.id) {
          return { ...payload };
        }
        return { ...el };
      });
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
    default:
      return state;
  }
};

export default postReducer;
