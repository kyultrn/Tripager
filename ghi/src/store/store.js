import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tripsApi } from "./TripsApi";
import { eventsApi } from "./EventsApi";
import TripModalReducer from "../trips/TripModalReducer";

export const store = configureStore({
  reducer: {
    [tripsApi.reducerPath]: tripsApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    modalForm: TripModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tripsApi.middleware)
      .concat(eventsApi.middleware),
});

setupListeners(store.dispatch);
