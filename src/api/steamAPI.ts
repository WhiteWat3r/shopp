import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../utils/config';

export const steamApi = createApi({
  reducerPath: 'steamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.baseUrl}/api`,
  }),
  tagTypes: ['steamControl'],

  endpoints: (build) => ({
    fetchGameInfo: build.query({
      query: (appids) => `/proxy/steamApi/appdetails?appids=${appids}`,
    }),
  }),
});
