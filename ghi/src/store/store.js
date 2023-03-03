import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tripsApi } from "./ApiSlice";
import { tripFormSliceReducer, tripModalSliceReducer } from "./tripModalSlice";
import { accountFormSliceReducer, loggedInSliceReducer, signUpModalSliceReducer } from "./AccountsSlice";
import { eventFormSliceReducer, eventModalSliceReducer } from "./eventModalSlice";


export const store = configureStore({
  reducer: {
    [tripsApi.reducerPath]: tripsApi.reducer,
    tripModal: tripModalSliceReducer,
    tripForm: tripFormSliceReducer,
    accountForm: accountFormSliceReducer,
    loggedIn: loggedInSliceReducer,
    signUpModal: signUpModalSliceReducer,
    eventForm: eventFormSliceReducer,
    eventModal: eventModalSliceReducer,

  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tripsApi.middleware);
  },
});

setupListeners(store.dispatch);
