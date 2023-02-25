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

export const { openTripModal, closeTripModal } = tripModalSlice.actions
export default tripModalSlice.reducer
