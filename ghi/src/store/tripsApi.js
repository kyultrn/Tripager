import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const initialState = {
//   trips: [
//     {name: "John's Bachelor Party", city: "Las Vegas", state: "Nevada", start_date: "02-24-23", end_date: "02-27-23", id: 1}
//   ]
// }
export const tripsApi = createApi({
  reducerPath: "trips",
  // initialState,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TRIPAGER_HOST,
  }),
  tagTypes: ["TripsList"],

  endpoints: (builder) => ({
    getTrips: builder.query({
      query: () => "/api/trips/",
      providesTags: ["TripsList"],
    }),
    createTrip: builder.mutation({
      query: (data) => ({
        url: "/api/trips",
        body: data,
        method: "post",
      }),
      invalidatesTags: ["TripsList"],
    }),
    deleteTrip: builder.mutation({
      query: (trip_id) => ({
        url: `/api/trips/${trip_id}`,
        method: "delete",
      }),
      invalidatesTags: ["TripsList"],
    }),
    updateTrip: builder.mutation({
      query: (trip_id) => ({
        url: `/api/trips/${trip_id}`,
        method: "put",
      }),
      invalidatesTags: ["TripsList"],
    }),
  }),
});

export const {
  useGetTripsQuery,
  useCreateTripMutation,
  useDeleteTripMutation,
  useUpdateTripMutation,
} = tripsApi;
