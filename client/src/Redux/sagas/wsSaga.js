import { take, put, call, fork, takeEvery } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
  GET_CHAT_MESSAGES,
  SET_CHAT_MESSAGE,
  SET_WS,
  WS_ALARM,
} from '../types';
import alarmWsAction from '../actions/alarmActions';

function createSocketChannel(socket, action) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      emit({ type: SET_WS, payload: true });
    };

    socket.onerror = function (error) {
      emit({ type: SET_WS, payload: null });
    };

    socket.onmessage = function (event) {
      emit(JSON.parse(event.data));
    };

    socket.onclose = function (event) {
      emit({ type: SET_WS, payload: null });
    };

    return () => {
      console.log('Socket off');
      emit(END);
    };
  });
}

function createWebSocketConnection() {
  return new WebSocket(process.env.REACT_APP_WSURL);
}

function* userMessage(socket) {
  while (true) {
    const message = yield take(SET_CHAT_MESSAGE);
    socket.send(JSON.stringify(message));
  }
}

function* getUserMessages(socket) {
  while (true) {
    const message = yield take(GET_CHAT_MESSAGES);
    socket.send(JSON.stringify(message));
  }
}

function* alarmUserEffect(socket) {
  while (true) {
    const message = yield take(WS_ALARM);
    socket.send(JSON.stringify(message));
  }
}

function* chatWatcer(action) {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action);

  yield fork(userMessage, socket);
  yield fork(getUserMessages, socket);
  yield fork(alarmUserEffect, socket);

  while (true) {
    try {
      const backAction = yield take(socketChannel);
      yield put(backAction);
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

export default function* initWebSocket() {
  yield takeEvery('SOCKET_INIT', chatWatcer);
}
