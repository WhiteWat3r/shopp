import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../utils/config';
import { getCookie } from '../utils/cookie';

export const supportApi = createApi({
  reducerPath: 'supportApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.baseUrl}/api/message`,
    prepareHeaders: (headers) => {
      const token = getCookie('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['supportControl', 'supportAdminControl', 'userChatRefreshControl'],

  endpoints: (build) => ({
    getChatWithSupport: build.query({
      query: () => '/support',
      providesTags: ['supportControl'],
    }),

    getChatWithUsers: build.query({
      query: () => '/all',
      providesTags: ['supportAdminControl'],
    }),



    // getUserChatRefresh: build.query({
    //   query: () => '/user-refresh',
    //   providesTags: ['userChatRefreshControl'],
    // }),


    // getAdminChatsRefresh: build.query({
    //   query: () => '/admin-refresh',
    //   providesTags: ['supportAdminControl'],
    // }),






    sendToAdmin: build.mutation({
      query: (body) => ({
        url: '/send',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['supportControl'],
    }),

    sendToUser: build.mutation({
      query: (body) => ({
        url: '/admin-send',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['supportAdminControl', 'userChatRefreshControl'],
    }),
  }),
});

export const {
useGetChatWithSupportQuery,
useGetChatWithUsersQuery,
useSendToAdminMutation,
useSendToUserMutation,
// useGetAdminChatsRefreshQuery,
// useGetUserChatRefreshQuery
} = supportApi;
