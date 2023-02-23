import { configureStore } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tripsApi = createApi({
  reducerPath: "trips",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TRIPAGER_HOST,
    // why i think should likely be called TRIPAGER
  }),
  endpoints: (builder) => ({
    // Names of methods we want to use to interact with API
    getTrips: builder.query({
      query: () => "/api/trips/",
    }),
  }),
});

export const { useGetTripsQuery } = tripsApi
