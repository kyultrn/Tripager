import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";


const tripModal = createSlice({
  name: "tripModal",
  initialState: false,
  reducers: {
    toggleTripModal: (state) => {
      state.isTripModalOpen = !state.isTripModalOpen
    }
  },
});
export const { toggleTripModal } = tripModal.actions;



export const tripOpen = (state: RootState) =>
  state.tripModal.isTripModalOpen;

export default tripModal.reducer





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
