import { createSlice } from "@reduxjs/toolkit"

const weatherSlice = createSlice({
    name: "weatherSlice",
    initialState: {
        latitude: "",
        longitude: "",
        temperature: "",
        icon: "",
    },
    reducers: {
        setCoordinatesData: (state, action) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
        },
        setTempIconData: (state, action) => {
            state.temperature = action.payload.temperature;
            state.icon = action.payload.icon;
        },
    }
})

export const { setCoordinatesData, setTempIconData } = weatherSlice.actions;
export const weatherSliceReducer = weatherSlice.reducer;
export default { weatherSliceReducer };
