import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { eventEndpoints } from "./eventEndpoints";

const initialState = {
  trips: []
}
export const tripsApi = createApi({
  reducerPath: "trips",
  initialState,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TRIPAGER_HOST,
    prepareHeaders: (headers, { getState }) => {
      const selector = tripsApi.endpoints.getToken.select();
      const { data: tokenData } = selector(getState());
      if (tokenData && tokenData.access_token) {
        headers.set(
          "Authorization",
          `${tokenData.token_type} ${tokenData.access_token}`
        );
      }
      return headers;
    },
  }),
  tagTypes: ["TripsList", "Token", "EventsList", "Account"],

  endpoints: (builder) => ({
    // Trips
    ...eventEndpoints(builder),
    getTrips: builder.query({
      query: () => ({
        url: "/api/trips/mytrips",
        credentials: "include",
      }),
      providesTags: ["TripsList"],
    }),
    getTrip: builder.query({
      query: (trip_id) => `/api/trips/${trip_id}`,
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
    // Accounts
    userLogin: builder.mutation({
      query: (info) => {
        console.log(info);
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append("username", info.email);
          formData.append("password", info.password);
        }
        return {
          url: "/token",
          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      providesTags:['Account'],
      invalidatesTags: (result) => {
        return (result && ["Token"]) || [];
      },
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token",
        credentials: "include",
      }),
      providesTags: ["Token"],
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: '/token',
        method: 'delete',
        credentials: 'include',
      }),
      invalidatesTags: ["Token", "Account"]
    }),
    userSignup: builder.mutation({
      query: (info) => ({
        url: '/api/accounts',
        method: 'post',
        body: info,
        credentials: 'include',
      }),
      provideTags: ["Account"],
      invalidatesTags: (result) => {
        return (result && ["Token"]) || [];
      },
    }),
  }),
});

export const {
  useGetTripsQuery,
  useGetTripQuery,
  useGetEventsQuery,
  useCreateTripMutation,
  useDeleteTripMutation,
  useUpdateTripMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useUserSignupMutation,
  useGetTokenQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = tripsApi;
