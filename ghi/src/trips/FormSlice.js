import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  city: "",
  state: "",
  start_date: "",
  end_date: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetFormData: () => initialState,
  },
});

export const { updateFormData, resetFormData } = formSlice.actions;

export const selectFormData = (state) => state.form;

export default formSlice.reducer;
