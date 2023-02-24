import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const initialState = {
  events: [],
};
export const eventsApi = createApi({
  reducerPath: "events",
  initialState,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TRIPAGER_HOST,
  }),
  tagTypes: ["EventsList"],

  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (trip_id) => `/api/trips/${trip_id}/events`,
      providesTags: ["EventsList"],
    }),
    createEvent: builder.mutation({
      query: (data, trip_id) => ({
        url: `/api/trips/${trip_id}/events`,
        body: data,
        method: "post",
      }),
      invalidatesTags: ["EventsList"],
    }),
    deleteEvent: builder.mutation({
      query: (event_id) => ({
        url: `/api/trips/{trip_id}/events/${event_id}`,
        method: "delete",
      }),
      invalidatesTags: ["EventsList"],
    }),
    updateEvent: builder.mutation({
      query: (trip_id, event_id) => ({
        url: `/api/trips/${trip_id}/events/${event_id}`,
        method: "put",
      }),
      invalidatesTags: ["EventsList"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = eventsApi;
