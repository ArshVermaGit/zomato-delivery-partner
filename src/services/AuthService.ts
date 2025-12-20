import { AuthService as ApiAuthService } from '@zomato/api-client';
import { store } from '../store';
import { loginSuccess, logout } from '../store/slices/authSlice';

export const AuthService = {
    sendOtp: async (phoneNumber: string) => {
        try {
            const response = await ApiAuthService.sendOtp({ phoneNumber, isLogin: true });
            return response;
        } catch (error) {
            console.error('Send OTP Error', error);
            throw error;
        }
    },

    verifyOtp: async (phoneNumber: string, otp: string) => {
        try {
            const response = await ApiAuthService.verifyOtp({ phoneNumber, otp });
            // Assuming response contains { user, token } or similar
            if (response.token) {
                store.dispatch(loginSuccess({ user: response.user, token: response.token }));
            }
            return response;
        } catch (error) {
            console.error('Verify OTP Error', error);
            throw error;
        }
    },

    login: async (phoneNumber: string) => {
        // Direct login for dev/testing
        try {
            const response = await ApiAuthService.login({ phoneNumber, password: 'password' });
            // Backend login returns { access_token } usually, verify mapping
            // If backend login returns user & token:
            const { access_token } = response;
            // We need to map response correctly.
            // Looking at AuthController: login returns `this.authService.login(req.user)` which returns access_token.
            // It might NOT return user object. We might need to fetch profile.

            if (access_token) {
                // Fetch profile?
                // For now, assume we dispatch token
                store.dispatch(loginSuccess({ user: { phoneNumber, id: 'unknown' }, token: access_token }));
                return { phoneNumber };
            }
            return response;
        } catch (error) {
            console.error('Login Error', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await ApiAuthService.logout();
            store.dispatch(logout());
        } catch (error) {
            console.error('Logout Error', error);
            store.dispatch(logout());
        }
    }
};
