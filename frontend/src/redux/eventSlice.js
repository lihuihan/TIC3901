import { createSlice } from "@reduxjs/toolkit";
const eventSlice = createSlice({
    name: 'event',
    initialState: {
        events: [],
        selectedEvent: null,
    },
    reducers: {
        // Actions
        // eventSlice.js
        setEvents: (state, action) => {
            // Ensure payload is array
            if (Array.isArray(action.payload)) {
                state.events = action.payload;
            } else {
                console.log("added not ok")
                console.error('setEvents received non-array payload:', action.payload);
                state.events = [];
            }
        },
        setSelectedEvent: (state, action) => {
            state.selectedEvent = action.payload;
        }
    }
});

export const { setEvents, setSelectedEvent } = eventSlice.actions;
export default eventSlice.reducer;