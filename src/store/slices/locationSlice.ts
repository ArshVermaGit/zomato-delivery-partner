import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Coordinates {
    latitude: number;
    longitude: number;
    heading?: number;
    speed?: number;
    timestamp?: number;
}

interface LocationState {
    currentLocation: Coordinates | null;
    isTracking: boolean;
    permissionStatus: 'GRANTED' | 'DENIED' | 'UNDETERMINED';
    history: Coordinates[]; // Keep a short tail of history
}

const initialState: LocationState = {
    currentLocation: null,
    isTracking: false,
    permissionStatus: 'UNDETERMINED',
    history: []
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        updateLocation: (state, action: PayloadAction<Coordinates>) => {
            state.currentLocation = action.payload;
            state.history.push(action.payload);
            if (state.history.length > 50) {
                state.history.shift(); // Keep only last 50 points
            }
        },
        setIsTracking: (state, action: PayloadAction<boolean>) => {
            state.isTracking = action.payload;
        },
        setPermissionStatus: (state, action: PayloadAction<LocationState['permissionStatus']>) => {
            state.permissionStatus = action.payload;
        },
        clearHistory: (state) => {
            state.history = [];
        }
    },
});

export const { updateLocation, setIsTracking, setPermissionStatus, clearHistory } = locationSlice.actions;
export default locationSlice.reducer;
