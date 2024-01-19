import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../utils/config';

export const publishersApi = createApi({
  reducerPath: 'publishersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.baseUrl}/api`
    
  }),
  tagTypes: ['publishersControl'],
  endpoints: (build) => ({
    fetchAllPublishers: build.query({
        query: () => '/publisher'
    })
  })
});

export const {useFetchAllPublishersQuery} = publishersApi;