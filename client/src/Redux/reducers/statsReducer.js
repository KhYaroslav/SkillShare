import { ALL_STATS_USERS } from '../types';

const statsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_STATS_USERS:
      return payload;
    default:
      return state;
  }
};

export default statsReducer;
