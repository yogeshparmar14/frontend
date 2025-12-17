import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from './config';
import type { RootState } from '@/store';
import { setCredentials, clearSession } from '@/features/auth/authSlice';

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;
    if (token) headers.set('authorization', `Bearer ${token}`);
    headers.set('content-type', 'application/json');
    return headers;
  },
  credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;
    if (!refreshToken) {
      api.dispatch(clearSession());
      return result;
    }
    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh', method: 'POST', body: { refreshToken } },
      api,
      extraOptions
    );
    if (refreshResult.data && typeof refreshResult.data === 'object') {
      const { accessToken, refreshToken: newRefreshToken } = (refreshResult.data as any).data || {};
      if (accessToken) {
        api.dispatch(setCredentials({ accessToken, refreshToken: newRefreshToken ?? refreshToken }));
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearSession());
      }
    } else {
      api.dispatch(clearSession());
    }
  }
  return result;
};
