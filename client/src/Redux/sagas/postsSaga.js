import { call, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import { ALL_POST, GET_SEARCH_POST } from '../types';
import { addPosts } from '../actions/postActions';

const filterPostsSaga = (input) => axios.post('/api/post/filter/posts', input);

const allPostSaga = () => axios('/api/post/posts');

function* allPostSagaWorker() {
  try {
    const posts = yield call(allPostSaga);
    yield put(addPosts(posts.data));
  } catch (e) {
    yield put(addPosts([{ word: 'Error from back' }]));
  }
}

function* filterPostSagaWorker(action) {
  try {
    yield delay(500);
    const posts = yield call(filterPostsSaga, action.payload);
    yield put(addPosts(posts.data));
  } catch (e) {
    yield put(addPosts([{ word: 'Error from back' }]));
  }
}

export function* allPostSagaWatcher() {
  yield takeLatest(ALL_POST, allPostSagaWorker);
}

export function* filterPostSagaWatcher() {
  yield takeLatest(GET_SEARCH_POST, filterPostSagaWorker);
}
