import { createSlice } from "@reduxjs/toolkit"

const accountFormSlice = createSlice({
    name:"accountForm",
    initialState:{ loginForm: {email: "",password: ""}, signUpForm: {name: "", email:"", password:""}},
    reducers: {
        updateSignUpFormData: (state, action) => {
            const { name, value } = action.payload
            state.signUpForm[name] = value
        },
        resetSignUpFormData: (state) => {state.signUpForm = { name: "", email: "", password: "" }},

        updateLoginFormData: (state, action) => {
            const { name, value } = action.payload
            state.loginForm[name] = value
        },
        resetLoginFormData: (state) => {state.loginForm = { email: "", password: "" }},
    },
})

const signUpModalSlice = createSlice({
    name: "signUpModal",
    initialState:{
        isSignUpModalOpen: false,
    },
    reducers: {
        openSignUpModal: (state) => {
            state.isSignUpModalOpen = true
        },
        closeSignUpModal: (state) => {
            state.isSignUpModalOpen = false
        }
    }
})

const loggedInSlice = createSlice({
    name: 'loggedIn',
    initialState: {
        loggedIn: false,
        token: null,
    },
    reducers: {
        setLoginState: (state, action) => {
            state.loggedIn = action.payload.loggedIn
            state.token = action.payload.token
        },
    }})

export const { openSignUpModal, closeSignUpModal } = signUpModalSlice.actions
export const { setLoginState } = loggedInSlice.actions
export const { updateSignUpFormData, resetSignUpFormData, updateLoginFormData, resetLoginFormData } = accountFormSlice.actions
export const selectLoginFormData = (state) => state.accountForm.loginForm;
export const selectSignUpFormData = (state) => state.accountForm.signUpForm;
export const signUpModalSliceReducer = signUpModalSlice.reducer
export const accountFormSliceReducer = accountFormSlice.reducer;
export const loggedInSliceReducer = loggedInSlice.reducer;
export default { accountFormSliceReducer, loggedInSliceReducer, signUpModalSliceReducer }
