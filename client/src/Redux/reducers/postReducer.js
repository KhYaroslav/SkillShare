import { ADD_POSTS, ADD_POST, DEL_POST } from '../types';

const postReducer = (state = { loading: true }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_POSTS:
      return payload;
    case ADD_POST:
      return [...state, payload];

    case DEL_POST:
      return state.filter((el) => el.id !== payload);
    default:
      return state;
  }
};

export default postReducer;
