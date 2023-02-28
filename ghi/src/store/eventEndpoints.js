export function eventEndpoints(builder){
    return {

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
    };
}
