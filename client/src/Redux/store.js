import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import newsReducer from './reducers/newsReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    news: newsReducer,
  },
});

export default store;
