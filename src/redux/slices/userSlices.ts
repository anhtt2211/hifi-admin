import { ListParams, ListResponse } from '@/models/common';
import { User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface UserState {
  loading?: boolean;
  user: User | undefined;
}

const initialState: UserState = {
  loading: false,
  user: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchAllUsersRequest: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    fetchAllUsersSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
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

export const $users = (state: RootState) => state.users.user;

export default userSlice.reducer;
