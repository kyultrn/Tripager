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
        },
        resetFormData: () => loginFormSlice.initialState,
    },
})

const loggedInSlice = createSlice({
    name: 'loggedIn',
    initialState: {
        logged: false,
    },
    reducers: {
        setLoginState: (state, action) => {

            state.logged = action.payload
        },
    }})

export const { setLoginState } = loggedInSlice.actions
export const { updateFormData, resetFormData } = loginFormSlice.actions
export const selectFormData = (state) => state.loginForm;
export const loginFormSliceReducer = loginFormSlice.reducer;
export const loggedInSliceReducer = loggedInSlice.reducer;
export default { loginFormSliceReducer, loggedInSliceReducer }
