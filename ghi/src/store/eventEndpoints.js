export function eventEndpoints(builder){

    return {
        getEvents: builder.query({
            query: (trip_id) => `/api/trips/${trip_id}/events`,
            providesTags: ["EventsList"],
        }),
        getEvent: builder.query({
            query: (data) => ({
            url: `/api/trips/${data.trip_id}/events/${data.event_id}`,
            }),
            providesTags: ["EventsList"],
        }),
        createEvent: builder.mutation({
            query: (data) => ({
            url: `/api/trips/${data.trip_id}/events`,
            body: data.formData,
            method: "post",
            }),
            invalidatesTags: ["EventsList"],
        }),
        deleteEvent: builder.mutation({
            query: (data) => ({
            url: `/api/trips/${data.trip_id}/events/${data.event_id}`,
            method: "delete",
            }),
            invalidatesTags: ["EventsList"],
        }),
        updateEvent: builder.mutation({
            query: (data) => ({
            url: `/api/trips/${data.trip_id}/events/${data.event_id}`,
            method: "put",
            }),
            invalidatesTags: ["EventsList"],
        }),
    };
}
