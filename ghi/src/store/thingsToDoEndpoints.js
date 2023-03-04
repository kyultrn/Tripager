export function thingsToDoEndpoints(builder){
    return {
      getThingsToDo: builder.query({
        query: (data) => ({
          url: "/api/businesses",
          params: { term: data.term, location: data.location },
        }),
        providesTags: ["ThingsToDoList"],
      }),
    };
}
