import { ListParams, ListResponse } from '@/models/common';
import { Category } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import type { RootState } from '../store';

interface CategoryState {
  entities: Category[];
}

const initialState: CategoryState = {
  entities: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoriesRequest: () =>
      // state: CategoryState,
      // action: PayloadAction<any>,
      {},
    fetchCategoriesSuccess: (
      state: CategoryState,
      action: PayloadAction<ListResponse<Category>>,
    ) => {
      state.entities = action.payload.data;
    },
    createCategory: (
      state: CategoryState,
      { payload }: PayloadAction<Category>,
    ) => {
      state.entities.push(payload);
      notification.success({
        message: 'Created category successfully!',
      });
    },
    updateCategory: (
      state: CategoryState,
      { payload }: PayloadAction<Category>,
    ) => {
      notification.success({
        message: 'Updated category successfully!',
      });
      state.entities = state.entities.map((category) =>
        category._id == payload._id ? payload : category,
      );
    },
    deleteCategory: (
      state: CategoryState,
      { payload }: PayloadAction<Category>,
    ) => {
      notification.success({
        message: 'Deleted successfully!',
      });
      state.entities = state.entities.filter(
        (category) => category._id != payload._id,
      );
    },
  },
});

export const {
  fetchCategoriesSuccess,
  fetchCategoriesRequest,
  createCategory,
  updateCategory,
  deleteCategory,
} = categorySlice.actions;

export const $categories = (state: RootState) => state.categories.entities;

export default categorySlice.reducer;
