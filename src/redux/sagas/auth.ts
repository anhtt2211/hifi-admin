import authApi from '@/api/authApi';
import userApi from '@/api/userApi';
import { ListResponse } from '@/models/common';
import { Admin, User } from '@/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailed,
  fetchAuthRequest,
  fetchAuthSuccess,
  fetchAuthFailed,
} from '../slices/authSlices';

function* login(action: any) {
  try {
    const response: Admin = yield call(authApi.login, action.payload);

    yield put(loginSuccess(response));
  } catch (error: any) {
    yield put(loginFailed(error.message));
  }
}

function* fetchAuth(action: any) {
  try {
    const response: Admin = yield call(authApi.getAuth, action.payload);

    yield put(fetchAuthSuccess(response));
  } catch (error: any) {
    yield put(fetchAuthFailed(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, login);
  yield takeLatest(fetchAuthRequest.type, fetchAuth);
}
