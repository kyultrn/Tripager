export function tripEndpoints(builder) {

    return {
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
        invalidatesTags: ["TripsList"]
      }),
      updateTrip: builder.mutation({
        query: (data) => ({
          url: `/api/trips/${data.selectedTripId}`,
          body: data.formData,
          method: "put",
        }),
        invalidatesTags: ["TripsList"],
      }),
    };
}
