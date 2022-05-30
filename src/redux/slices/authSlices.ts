import { ListParams, ListResponse } from '@/models/common';
import { Admin } from '@/types';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface AuthState {
  loading?: boolean;
  auth: any | undefined;
}

const initialState: AuthState = {
  loading: false,
  auth: undefined,
};

const logout = createAction('logout');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<Admin>) => {
      state.loading = false;
      state.auth = action.payload;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
    },
    logoutUser: (state) => {
      state.auth = undefined;
    },
    fetchAuthRequest: (state) => {
      state.loading = true;
    },
    fetchAuthSuccess: (state, action: PayloadAction<Admin>) => {
      state.loading = false;
      state.auth = action.payload;
    },
    fetchAuthFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
    },
    setUser: (state, action: PayloadAction<Admin>) => {
      state.auth = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  logoutUser,
  fetchAuthRequest,
  fetchAuthSuccess,
  fetchAuthFailed,
  setUser,
} = authSlice.actions;

export const $auth = (state: RootState) => state.auth;

export default authSlice.reducer;
