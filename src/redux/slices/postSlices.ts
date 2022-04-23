import { ListParams, ListResponse } from '@/models/common';
import { Post } from '@/models/post';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';


interface PostState {
  loading?: boolean;
  list: Post[];
}

const initialState: PostState = {
  loading: false,
  list: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchAllUsersRequest: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    fetchAllUsersSuccess: (
      state,
      action: PayloadAction<ListResponse<Post>>,
    ) => {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchAllUsersFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
    },
  },
});

export const {
  fetchAllUsersSuccess,
  fetchAllUsersRequest,
  fetchAllUsersFailed,
} = postSlice.actions;

export const $users = (state: RootState) => state.users;

export default postSlice.reducer;
