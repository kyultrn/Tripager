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


const tripFormSlice = createSlice({
  name: "tripForm",
  initialState:{
    name: "",
    city: "",
    state: "",
    start_date: "",
    end_date: "",
    selectedTripId: null,
  },
  reducers: {
    changeToSelectedTripData: (state, action, trip ) => {
      console.log("this is the trip that is being sent ****", trip)
      state.name= trip.name;
      state.city= trip.city;
      state.state= trip.state;
      state.start_date= trip.start_date;
      state.end_date= trip.end_date;
    },
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetFormData: (state) => {
      state.name= "";
      state.city= "";
      state.state= "";
      state.start_date= "";
      state.end_date= "";
    },
    setSelectedTripId: (state, action) => {
      state.selectedTripId = action.payload;
    },
  },
});

export const { openCreateTripModal, closeCreateTripModal, openUpdateTripModal, closeUpdateTripModal } = tripModalSlice.actions
export const { updateFormData, resetFormData, setSelectedTripId, changeToSelectedTripData } = tripFormSlice.actions;
export const selectTripFormData = (state) => state.tripForm;
export const tripFormSliceReducer = tripFormSlice.reducer;
export const tripModalSliceReducer = tripModalSlice.reducer;


export default { tripFormSliceReducer, tripModalSliceReducer };
