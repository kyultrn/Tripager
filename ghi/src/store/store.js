import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tripagerApi } from "./ApiSlice";
import { tripFormSliceReducer, tripModalSliceReducer } from "./tripModalSlice";
import { accountFormSliceReducer, loggedInSliceReducer, signUpModalSliceReducer } from "./AccountsSlice";
import { eventFormSliceReducer, eventModalSliceReducer } from "./eventModalSlice";

export const store = configureStore({
  reducer: {
    [tripagerApi.reducerPath]: tripagerApi.reducer,
    tripModal: tripModalSliceReducer,
    tripForm: tripFormSliceReducer,
    accountForm: accountFormSliceReducer,
    loggedIn: loggedInSliceReducer,
    signUpModal: signUpModalSliceReducer,
    eventForm: eventFormSliceReducer,
    eventModal: eventModalSliceReducer,

  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tripagerApi.middleware);
  },
});

setupListeners(store.dispatch);
