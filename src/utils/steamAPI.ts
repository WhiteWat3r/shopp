import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from './request';
import { getCookie } from './cookie';

export const steamApi = createApi({
  reducerPath: 'steamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl
  }),
  tagTypes: ['steamControl'],

  endpoints: (build) => ({
    fetchGameInfo: build.query({
        query: (appids) => `/proxy/steamApi/appdetails?appids=${appids}`,
    }),
  }),
});

