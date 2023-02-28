import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tripsApi } from "./apiSlice";
import { createTripFormSliceReducer, tripModalSliceReducer } from "./tripModalSlice";

export const store = configureStore({
  reducer: {
    [tripsApi.reducerPath]: tripsApi.reducer,
    // [eventsApi.reducerPath]: eventsApi.reducer,
    tripModal: tripModalSliceReducer,
    form: createTripFormSliceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tripsApi.middleware);
  },
  // .concat(eventsApi.middleware)},
});

setupListeners(store.dispatch);
