import userApi from '@/api/userApi';
import { ListResponse } from '@/models/common';
import { User } from '@/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchAllUsersFailed,
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
} from '../slices/userSlices';

function* fetchAllUsers(action: any) {
  try {
    const response: User = yield call(userApi.getAllUsers);

    yield put(fetchAllUsersSuccess(response));
  } catch (error: any) {
    yield put(fetchAllUsersFailed(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchAllUsersRequest.type, fetchAllUsers);
}
