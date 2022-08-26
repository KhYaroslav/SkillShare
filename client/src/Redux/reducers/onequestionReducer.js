const onequestionReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_QUESTION':
      return payload;
    default:
      return state;
  }
};//

export default onequestionReducer;
