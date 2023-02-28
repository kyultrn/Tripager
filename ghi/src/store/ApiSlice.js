import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  tagTypes: ["TripsList", "Token", "Account"],

  endpoints: (builder) => ({
    // Trips
    getTrips: builder.query({
      query: () => ({
        url: "/api/trips/mytrips",
        credentials: 'include',
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
        console.log(info)
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append('username', info.email);
          formData.append('password', info.password);
        }
        return {
          url: '/token',
          method: 'post',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: result => {
        return (result && ['Account']) || [];
      },
    }),
    getToken: builder.query({
      query: () => ({
        url: '/token',
        credentials: 'include',
      }),
      providesTags: ['Token'],
    }),
  }),
});

export const {
  useGetTripsQuery,
  useLazyGetTripsQuery,
  useGetTripQuery,
  useCreateTripMutation,
  useDeleteTripMutation,
  useUpdateTripMutation,
  useUserLoginMutation,
  useGetTokenQuery,
} = tripsApi;
