import categorytApi from '@/api/categoryApi';
import { ListResponse } from '@/models/common';
import { Category } from '@/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
} from '../slices/categorySlice';

function* fetchCategories(action: any) {
  try {
    const response: ListResponse<Category> = yield call(
      categorytApi.getAllCategories,
    );

    yield put(fetchCategoriesSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

export default function* categoriesSaga() {
  yield takeLatest(fetchCategoriesRequest.type, fetchCategories);
}
