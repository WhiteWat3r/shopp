import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from './request';
import { getCookie } from './cookie';

export const basketApi = createApi({
  reducerPath: 'basketApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.baseUrl}/api/cart`,
    prepareHeaders: (headers) => {
      const token = getCookie('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['basketControl'],

  endpoints: (build) => ({
    getBasketInfo: build.query({
      query: () => '/get-cart',
      providesTags: ['basketControl'],
    }),

    addItem: build.mutation({
      query: (body) => ({
        url: '/add-to-cart',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['basketControl'],
    }),

    deleteItem: build.mutation({
      query: (body) => ({
        url: '/remove-from-cart',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['basketControl'],
    }),

    deletePosition: build.mutation({
      query: (body) => ({
        url: '/cart/remove-all-copies',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['basketControl'],
    }),
  }),
});

export const {
  useAddItemMutation,
  useDeleteItemMutation,
  useDeletePositionMutation,
  useGetBasketInfoQuery,
} = basketApi;
