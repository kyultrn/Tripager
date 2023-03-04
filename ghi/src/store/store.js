import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tripagerApi } from "./ApiSlice";
import { tripFormSliceReducer, tripModalSliceReducer } from "./tripModalSlice";
import { accountFormSliceReducer, loggedInSliceReducer, signUpModalSliceReducer } from "./AccountsSlice";
import { eventFormSliceReducer, eventModalSliceReducer } from "./eventModalSlice";
import { weatherSliceReducer } from "./weatherSlice";

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
    weatherSlice: weatherSliceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tripagerApi.middleware);
  },
});

setupListeners(store.dispatch);
