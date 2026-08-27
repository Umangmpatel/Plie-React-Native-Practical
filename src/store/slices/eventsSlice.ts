import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../services/api/apiClient';
import { EventItem } from '../../types/events';

interface EventsState {
    events: EventItem[];
    loading: boolean;
    error: string | null;
}

const initialState: EventsState = {
    events: [],
    loading: false,
    error: null,
};

export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (_, { rejectWithValue }) => {
        try {
            const response: any = await apiClient.POST('events-listing');
            if (response && response.success) {
                return response.data; // Specifically response.data containing the events array
            }
            return rejectWithValue(response?.message || 'Something went wrong');
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents(state, action: PayloadAction<EventItem[]>) {
            state.events = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload?.events || [];
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setEvents, setLoading } = eventsSlice.actions;
export default eventsSlice.reducer;
