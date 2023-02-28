import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tripsApi } from "./apiSlice";
import { createTripFormSliceReducer, tripModalSliceReducer } from "./tripModalSlice";
import { loginFormSliceReducer, loggedInSliceReducer } from "./accountsSlice";


export const store = configureStore({
  reducer: {
    [tripsApi.reducerPath]: tripsApi.reducer,
    tripModal: tripModalSliceReducer,
    form: createTripFormSliceReducer,
    loginForm: loginFormSliceReducer,
    loggedIn: loggedInSliceReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tripsApi.middleware);
  },
});

setupListeners(store.dispatch);
