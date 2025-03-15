import { createSlice } from "@reduxjs/toolkit";
const eventSlice = createSlice({
    name: 'event',
    initialState: {
        events: [],
        selectedEvent: null,
    },
    reducers: {
        // Actions
        setEvents: (state, action) => {
            state.events = action.payload;
        },
        setSelectedEvent: (state, action) => {
            state.selectedEvent = action.payload;
        }
    }
});

export const { setEvents, setSelectedEvent } = eventSlice.actions;
export default eventSlice.reducer;