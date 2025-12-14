import apiClient from './api/axiosInstance';
import { store } from '../store';
import { loginSuccess, logout } from '../store/slices/authSlice';

export const AuthService = {
    sendOtp: async (phoneNumber: string) => {
        try {
            const response = await apiClient.post('/auth/send-otp', { phone: phoneNumber, role: 'delivery' });
            return response.data;
        } catch (error) {
            console.error('Send OTP Error', error);
            throw error;
        }
    },

    verifyOtp: async (phoneNumber: string, otp: string) => {
        try {
            const response = await apiClient.post('/auth/verify-otp', { phone: phoneNumber, otp, role: 'delivery' });
            return response.data;
        } catch (error) {
            console.error('Verify OTP Error', error);
            throw error;
        }
    },

    login: async (phoneNumber: string) => {
        // Direct login for dev/testing when OTP disabled
        try {
            // We use a mock endpoint or assume the backend has a direct login for dev
            const response = await apiClient.post('/auth/login', { phoneNumber, password: 'password', role: 'delivery' });
            const { user, token } = response.data;
            store.dispatch(loginSuccess({ user, token }));
            return user;
        } catch (error) {
            console.error('Login Error', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await apiClient.post('/auth/logout');
            store.dispatch(logout());
        } catch (error) {
            console.error('Logout Error', error);
        }
    }
};
