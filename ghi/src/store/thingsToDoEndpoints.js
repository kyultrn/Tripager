export function thingsToDoEndpoints(builder){
    return {
      getThingsToDo: builder.query({
        query: (term, location) => ({
          url: "/api/businesses",
          params: { term, location },
        }),
        providesTags: ["ThingsToDoList"],
      }),
    };
}
