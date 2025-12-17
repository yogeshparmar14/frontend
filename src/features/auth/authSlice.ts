import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Role = 'User' | 'Admin';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: Role;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user?: AuthUser | null; accessToken?: string | null; refreshToken?: string | null }>
    ) => {
      if (typeof action.payload.user !== 'undefined') state.user = action.payload.user;
      if (typeof action.payload.accessToken !== 'undefined') state.accessToken = action.payload.accessToken;
      if (typeof action.payload.refreshToken !== 'undefined') state.refreshToken = action.payload.refreshToken;
    },
    clearSession: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, clearSession } = authSlice.actions;
export default authSlice.reducer;
