const { SET_ALL_USERS_ALARM } = require('../types');

const alarmReducer = (state = false, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALL_USERS_ALARM:
      return payload;
    default:
      return state;
  }
};

export default alarmReducer;
