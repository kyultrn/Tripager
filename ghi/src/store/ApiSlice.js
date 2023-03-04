import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { accountsEndpoints } from "./accountsEndpoints";
import { eventEndpoints } from "./eventEndpoints";
import { tripEndpoints } from "./tripEndpoints";
import { thirdPartyApiEndpoints } from "./thirdPartyApiEndpoints";

const initialState = {
  trips: []
}
export const tripagerApi = createApi({
  reducerPath: "api",
  initialState,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TRIPAGER_HOST,
    prepareHeaders: (headers, { getState }) => {
      const selector = tripagerApi.endpoints.getToken.select();
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
    ...tripEndpoints(builder),
    // Events
    ...eventEndpoints(builder),
    // Accounts
    ...accountsEndpoints(builder),
    ...thirdPartyApiEndpoints(builder),
  }),
});

export const {
  useGetTokenQuery,
  useUserLoginMutation,
  useUserLogoutMutation,
  useUserSignupMutation,

  useGetTripQuery,
  useGetTripsQuery,
  useCreateTripMutation,
  useDeleteTripMutation,
  useUpdateTripMutation,

  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,

  useGetThingsToDoQuery,
  useGetWeatherDataQuery,

} = tripagerApi;
