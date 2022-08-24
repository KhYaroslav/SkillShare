import { ALERT_TRUE, ALERT_FALSE } from '../types';

const alertReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALERT_TRUE:
      return payload;
    case ALERT_FALSE:
      return payload;
    default:
      return state;
  }
};

export default alertReducer;
