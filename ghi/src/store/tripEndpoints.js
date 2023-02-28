export function tripEndpoints(builder) {

    return {
        getTrips: builder.query({
            query: () => "/api/trips/mytrips",
            providesTags: ["TripsList"],
            credentials: "include",
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
    };

}
