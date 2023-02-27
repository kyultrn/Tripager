import { createSlice } from "@reduxjs/toolkit"


const tripModalSlice = createSlice({
  name: "tripModal",
  initialState:{
    isModalOpen: false,
  },
  reducers: {
    openTripModal: (state) => {
      state.isModalOpen = true
    },
    closeTripModal: (state) => {
      state.isModalOpen = false
    },
  },
})


const createTripFormSlice = createSlice({
  name: "form",
  initialState:{
    name: "",
    city: "",
    state: "",
    start_date: "",
    end_date: "",
  },
  reducers: {
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetFormData: () => createTripFormSlice.initialState,
  },
});

export const { openTripModal, closeTripModal } = tripModalSlice.actions
export const { updateFormData, resetFormData } = createTripFormSlice.actions;
export const selectFormData = (state) => state.form;
export const createTripFormSliceReducer = createTripFormSlice.reducer;
export const tripModalSliceReducer = tripModalSlice.reducer;


export default { createTripFormSliceReducer, tripModalSliceReducer };
