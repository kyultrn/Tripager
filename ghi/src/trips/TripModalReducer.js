import { createSlice } from "@reduxjs/toolkit"


const tripModalSlice = createSlice({
  name: "tripModal",
  initialState:{
    isOpen: false,
    formData: {},
  },
  reducers: {
    openTripModal: (state) => {
      state.isOpen = true
    },
    closeTripModal: (state) => {
      state.isOpen = false
    },
    setFormData: (state, action) => {
      state.formData = action.payload
    },
    clearFormData: (state) => {
      state.formData = {}
    },
  },
})

export const { openTripModal, closeTripModal, setFormData, clearFormData } = tripModalSlice.actions
export default tripModalSlice.reducer






// const modalReducer = (state = false, action) => {
//   switch (action.type) {
//     case "SHOW":
//       return true;
//     case "HIDE":
//       return false;
//     default:
//       return state;
//   }
// };

// const showStore = createSlice(modalReducer);

// export default showStore;
