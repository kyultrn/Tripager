import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tripsApi } from "./TripsApi";

export const store = configureStore({
  reducer: {
    [tripsApi.reducerPath]: tripsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tripsApi.middleware),
});

setupListeners(store.dispatch);
