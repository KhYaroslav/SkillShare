import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import chatMessageReducer from './reducers/chatMessageReducer';
import chatUserReducer from './reducers/chatUsersReducer';
import userReducer from './reducers/userReducer';
import wsReducer from './reducers/wsReducer';
import rootSaga from './sagas/rootSaga';
import alertReducer from './reducers/alertReducer';
import postReducer from './reducers/postReducer';
import likeReducer from './reducers/likeReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    ws: wsReducer,
    chatUsers: chatUserReducer,
    messages: chatMessageReducer,
    alert: alertReducer,
    posts: postReducer,
    likes: likeReducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);
export default store;
