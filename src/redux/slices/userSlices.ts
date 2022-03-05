import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface UserState {
  name: string;
  old: number;
}

const initialState: UserState = {
  name: '',
  old: 18,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.old = action.payload.old;
    },
  },
});

export const { createUser } = userSlice.actions;

export const $users = (state: RootState) => state.users;

export default userSlice.reducer;
