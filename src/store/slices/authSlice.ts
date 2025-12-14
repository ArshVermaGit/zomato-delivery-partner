import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OnboardingStatus =
    | 'NOT_STARTED'
    | 'DOCUMENTS_UPLOADED'
    | 'VERIFICATION_PENDING'
    | 'APPROVED'
    | 'REJECTED';

interface User {
    id: string;
    phoneNumber: string;
    name?: string;
    photo?: string;
    email?: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    onboardingStatus: OnboardingStatus;
    token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    onboardingStatus: 'NOT_STARTED',
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.onboardingStatus = 'NOT_STARTED';
        },
        updateOnboardingStatus: (state, action: PayloadAction<OnboardingStatus>) => {
            state.onboardingStatus = action.payload;
        },
        setUserData: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        }
    },
});

export const { loginSuccess, logout, updateOnboardingStatus, setUserData } = authSlice.actions;
export default authSlice.reducer;
