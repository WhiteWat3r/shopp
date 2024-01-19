import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../utils/config';
import { getCookie } from '../utils/cookie';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.baseUrl}/api`,
    prepareHeaders: (headers) => {
      const token = getCookie('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['gameControl'],

  endpoints: (build) => ({
    fetchAllCards: build.query({
      query: () => '/game',
    }),
    fetchOneCard: build.query({
      query: (id) => `/game/${id}`,
    }),


    addGame: build.mutation({
      query: (body) =>({
        url: '/game/',
        method: "POST",
        body
     }),
     invalidatesTags: ['gameControl']
    }),
    updateGame: build.mutation({
      query: ({game, id}) =>({
        url: `/game/${id}`,
        method: "PUT",
        body: game
     }),
     invalidatesTags: ['gameControl']
    })
  }),
});

export const {
  useFetchAllCardsQuery,
  useFetchOneCardQuery,
  useAddGameMutation,
  useUpdateGameMutation
} = gameApi;