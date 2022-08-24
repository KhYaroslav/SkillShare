import { all } from 'redux-saga/effects';
import initWebSocket from './wsSaga';
import { allPostSagaWatcher, filterPostSagaWatcher } from './postsSaga';

export default function* rootSaga() {
  yield all([
    initWebSocket(),
    allPostSagaWatcher(),
    filterPostSagaWatcher(),
  ]);
}
