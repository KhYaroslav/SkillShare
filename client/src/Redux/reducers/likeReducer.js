import { ADD_LIKE } from '../types';

const likeReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_LIKE:
      if (!state.includes(payload)) { return [...state, payload]; }
      return state.filter((el) => el !== payload);

    default:
      return state;
  }
};

export default likeReducer;
