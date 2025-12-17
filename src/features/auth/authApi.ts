"use client";
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/lib/baseQuery';
import type { AuthUser } from './authSlice';
import { setCredentials, clearSession } from './authSlice';

export type ApiSuccess<T> = { success: true; data: T };
export type LoginRequest = { email: string; password: string };
export type RegisterRequest = { email: string; password: string; name?: string };
export type AuthResponse = { user: AuthUser; accessToken: string; refreshToken: string };

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<ApiSuccess<AuthResponse>, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.data.user, accessToken: data.data.accessToken, refreshToken: data.data.refreshToken }));
        } catch {}
      },
    }),
    register: builder.mutation<ApiSuccess<AuthResponse>, RegisterRequest>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.data.user, accessToken: data.data.accessToken, refreshToken: data.data.refreshToken }));
        } catch {}
      },
    }),
    logout: builder.mutation<ApiSuccess<{ message: string }>, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearSession());
        }
      },
    }),
    me: builder.query<ApiSuccess<{ id: string; email: string; name?: string; role: 'User' | 'Admin' }>, void>({
      query: () => ({ url: '/users/me', method: 'GET' }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useMeQuery } = authApi;
