import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tripsApi } from "./ApiSlice";
import { createTripFormSliceReducer, tripModalSliceReducer } from "./TripModal";
import { loginFormSliceReducer } from "./AccountsSlice"

export const store = configureStore({
  reducer: {
    [tripsApi.reducerPath]: tripsApi.reducer,
    tripModal: tripModalSliceReducer,
    form: createTripFormSliceReducer,
    loginForm: loginFormSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>{
    return getDefaultMiddleware()
      .concat(tripsApi.middleware)},
});

setupListeners(store.dispatch);
