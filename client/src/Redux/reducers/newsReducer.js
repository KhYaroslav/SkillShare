import { ADD_NEWS } from '../types';

const newsReducer = (state = [], action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case ADD_NEWS:
      return payload;
    default:
      return state;
  }
};

export default newsReducer;
