import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../utils/config";
import { getCookie } from "../utils/cookie";

export const favoriteApi = createApi({
    reducerPath: 'favoriteApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `${config.baseUrl}/api/favorites`,
      prepareHeaders: (headers) => {
        const token = getCookie('accessToken');
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    tagTypes: ['favoriteControl'],
  
    endpoints: (build) => ({
      getFavoriteInfo: build.query({
        query: () => '/get-favorites',
        providesTags: ['favoriteControl'],
      }),
  
      addFavorite: build.mutation({
        query: (body) => ({
          url: '/add-to-favorites',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['favoriteControl'],
      }),
  
      deleteFavorite: build.mutation({
        query: (body) => ({
          url: '/remove-from-favorites',
          method: 'DELETE',
          body,
        }),
        invalidatesTags: ['favoriteControl'],
      }),
  
     
    }),
  });
  
  export const {
    useAddFavoriteMutation,
    useDeleteFavoriteMutation,
    useGetFavoriteInfoQuery,
  } = favoriteApi;
  