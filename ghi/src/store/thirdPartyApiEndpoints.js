export function thirdPartyApiEndpoints(builder){
  
    return {
      getThingsToDo: builder.query({
        query: (term, location) => ({
          url: "/api/businesses",
          params: { term, location },
        }),
        providesTags: ["ThingsToDoList"],
      }),
      getExcursRoulette: builder.query({
        query: (location) => ({
          url: "api/businesses",
          params: { location }
        }),
        providesTags: ["ThingsToDoList"]
      }),
      getWeatherData: builder.query({
        query: (data) => ({
          url: "/api/weather",
          params: { latitude: data.latitude, longitude: data.longitude },
        }),
      }),
    };
}
