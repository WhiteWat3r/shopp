import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../utils/config';
import { getCookie } from '../utils/cookie';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.baseUrl}/api/user`,
    prepareHeaders: (headers) => {
      const token = getCookie('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['authControl'],
  endpoints: (build) => ({
    authCheck: build.query({
      query: () => ({
        url: '/auth',
      }),
    }),

    authLogin: build.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    authLogout: build.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    authRegister: build.mutation({
      query: (body) => ({
        url: '/registration',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useAuthCheckQuery,
  useAuthLoginMutation,
  useAuthLogoutMutation,
  useAuthRegisterMutation,
} = authApi;
