import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tripsApi, } from "../store/tripsApi";
import { authApiSlice } from "./authApi";
import { accountSlice } from "./accountsSlice";

export const store = configureStore({
  reducer: {
    [tripsApi.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(tripsApi.middleware)
      .concat(authApiSlice.middleware);
  },
});

setupListeners(store.dispatch);
