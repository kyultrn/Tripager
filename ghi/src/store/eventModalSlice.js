import { createSlice } from '@reduxjs/toolkit'


const eventModalSlice = createSlice({
    name: "eventModal",
    initialState:{
        isModalOpen: {createModal: false, updateModal: false},
    },
    reducers:{
        openCreateEventModal: (state) => {
            state.isModalOpen.createModal = true
        },
        closeCreateEventModal: (state) => {
            state.isModalOpen.createModal = false
        },
        openUpdateEventModal: (state) => {
            state.isModalOpen.updateModal = true
        },
        closeUpdateEventModal: (state) => {
            state.isModalOpen.updateModal = false
        },
    },
})


const eventFormSlice = createSlice({
    name: "eventForm",
    initialState:{
        name: "",
        description: "",
        picture_url: "",
        location: "",
        date: "",
        start_time: "",
        end_time: "",
        trip_id: "",
        // account_id: "",
        selectedEventId: null,

    },
    reducers: {
        changeToSelectedEventData: (state, action, event ) => {
            console.log("this is the event that is being sent ****", event)
            state.name= event.name;
            state.description= event.description;
            state.picture_url= event.picture_url;
            state.location= event.location;
            state.date= event.date;
            state.start_date= event.start_date;
            state.end_date= event.end_date;
        },
        updateFormData: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
        resetFormData: (state) => {
            state.name = ""
            state.description = ""
            state.picture_url = ""
            state.location = ""
            state.date = ""
            state.start_time = ""
            state.end_time = ""
        },
        setSelectedEventId: (state, action) => {
            state.selectedEventId = action.payload
        },
    },
})

export const { openCreateEventModal, closeCreateEventModal, openUpdateEventModal, closeUpdateEventModal } = eventModalSlice.actions
export const { updateFormData, resetFormData, setSelectedEventId, changeToSelectedEventData } = eventFormSlice.actions
export const selectEventFormData = (state) => state.eventForm
export const eventFormSliceReducer = eventFormSlice.reducer
export const eventModalSliceReducer = eventModalSlice.reducer

export default { eventFormSliceReducer, eventModalSliceReducer }
