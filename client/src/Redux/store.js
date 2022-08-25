import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import chatMessageReducer from './reducers/chatMessageReducer';
import chatUserReducer from './reducers/chatUsersReducer';
import userReducer from './reducers/userReducer';
import wsReducer from './reducers/wsReducer';
import rootSaga from './sagas/rootSaga';
import alertReducer from './reducers/alertReducer';
import postReducer from './reducers/postReducer';
import alarmReducer from './reducers/alarmReducer';
import statsReducer from './reducers/statsReducer';
import questionReducer from './reducers/questionReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    ws: wsReducer,
    chatUsers: chatUserReducer,
    messages: chatMessageReducer,
    alert: alertReducer,
    posts: postReducer,
    alarm: alarmReducer,
    stats: statsReducer,
    questions: questionReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);
export default store;
