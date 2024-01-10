import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from './request';
import { getCookie } from './cookie';

export const basketApi = createApi({
  reducerPath: 'basketApi',
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
  tagTypes: ['basketControl'],

  endpoints: (build) => ({
    getBasketInfo: build.query({
      query: () => '/cart/get-cart',
      providesTags: ['basketControl']
    }),
    

    addItem: build.mutation({
        query: (body) =>({
           url: '/cart/add-to-cart',
           method: "POST",
           body
        }),
        invalidatesTags: ['basketControl']
      }),

      deleteItem: build.mutation({
        query: (body) =>({
           url: '/cart/remove-from-cart',
           method: "DELETE",
           body
        }),
        invalidatesTags: ['basketControl']
      }),


      deletePosition: build.mutation({
        query: (body) =>({
           url: '/cart/remove-all-copies',
           method: "DELETE",
           body
        }),
        invalidatesTags: ['basketControl']
      }),

  }),
});

