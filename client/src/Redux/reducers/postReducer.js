import { ADD_POSTS, ADD_POST, DEL_POST, ADD_LIKE } from '../types';

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
        // console.log('---->>> Payload:', payload, 'Element:', el);
        if (el.id === payload.id) {
          return { ...payload };
        }
        return { ...el };
      });

    default:
      return state;
  }
};

export default postReducer;
