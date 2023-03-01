import { createSlice } from "@reduxjs/toolkit"


const tripModalSlice = createSlice({
  name: "tripModal",
  initialState:{
    isModalOpen: {createModal: false, updateModal: false},
  },
  reducers: {
    openCreateTripModal: (state) => {
      state.isModalOpen.createModal = true
    },
    closeCreateTripModal: (state) => {
      state.isModalOpen.createModal = false
    },
    openUpdateTripModal: (state) => {
      state.isModalOpen.updateModal = true
    },
    closeUpdateTripModal: (state) => {
      state.isModalOpen.updateModal = false
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

export const { openCreateTripModal, closeCreateTripModal, openUpdateTripModal, closeUpdateTripModal } = tripModalSlice.actions
export const { updateFormData, resetFormData } = createTripFormSlice.actions;
export const selectFormData = (state) => state.form;
export const createTripFormSliceReducer = createTripFormSlice.reducer;
export const tripModalSliceReducer = tripModalSlice.reducer;


export default { createTripFormSliceReducer, tripModalSliceReducer };
