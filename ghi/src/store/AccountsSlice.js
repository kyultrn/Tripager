import { createSlice } from "@reduxjs/toolkit"

const loginFormSlice = createSlice({
    name:"loginForm",
    initialState:{
        email: "",
        password: "",
    },
    reducers: {
        updateFormData: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        }
    }
})

export const { updateFormData } = loginFormSlice.actions
export const selectFormData = (state) => state.loginForm;
export const loginFormSliceReducer = loginFormSlice.reducer;
export default { loginFormSliceReducer }
