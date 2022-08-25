import { ALERT_CONDITION } from '../types';

const alertReducer = (state = 1, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALERT_CONDITION:
      return payload;
    default:
      return state;
  }
};

export default alertReducer;
