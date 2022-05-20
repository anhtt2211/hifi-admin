import { all } from 'redux-saga/effects';
import userSaga from './sagas/user';

export default function* rootSaga() {
  yield all([userSaga()]);
}
