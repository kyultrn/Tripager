export function eventEndpoints(builder){

    return {
        getEvents: builder.query({
            query: (trip_id) => `/api/trips/${trip_id}/events`,
            providesTags: ["EventsList"],
        }),
        getEvent: builder.query({
            query: (data) => ({
            url: `/api/trips/${data.tripId}/events/${data.selectedEventId}`,
            }),
            providesTags: ["EventsList"],
        }),
        createEvent: builder.mutation({
            query: (data) => ({
            url: `/api/trips/${data.tripId}/events`,
            body: data.formData,
            method: "post",
            }),
            invalidatesTags: ["EventsList"],
        }),
        deleteEvent: builder.mutation({
            query: (data) => ({
            url: `/api/trips/${data.tripId}/events/${data.eventId}`,
            method: "delete",
            }),
            invalidatesTags: ["EventsList"],
        }),
        updateEvent: builder.mutation({
            query: (data) =>{
            return({
            url: `/api/trips/${data.tripId}/events/${data.selectedEventId}`,
            body: data.formData,
            method: "put",
            })},
            invalidatesTags: ["EventsList"],
        }),
    };
}
