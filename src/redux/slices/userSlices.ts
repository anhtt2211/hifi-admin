import { ListParams, ListResponse } from '@/models/common';
import { User } from '@/models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface UserState {
  loading?: boolean;
  list: User[];
}

const initialState: UserState = {
  loading: false,
  list: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchAllUsersRequest: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    fetchAllUsersSuccess: (
      state,
      action: PayloadAction<ListResponse<User>>,
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
} = userSlice.actions;

export const $users = (state: RootState) => state.users;

export default userSlice.reducer;
