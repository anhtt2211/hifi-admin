import { all } from 'redux-saga/effects';
import authSaga from './sagas/auth';
import categoriesSaga from './sagas/category';
import userSaga from './sagas/user';

export default function* rootSaga() {
  yield all([userSaga(), authSaga(), categoriesSaga()]);
}
