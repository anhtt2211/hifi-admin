import { ListParams, ListResponse } from '@/models/common';
import { Category } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface CategoryState {
  list: Category[];
}

const initialState: CategoryState = {
  list: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoriesRequest: (
      state: CategoryState,
      action: PayloadAction<any>,
    ) => {},
    fetchCategoriesSuccess: (
      state: CategoryState,
      action: PayloadAction<ListResponse<Category>>,
    ) => {
      state.list = action.payload.data;
    },
  },
});

export const { fetchCategoriesSuccess, fetchCategoriesRequest } =
  categorySlice.actions;

export const $categories = (state: RootState) => state.categories;

export default categorySlice.reducer;
