import { createApi, retry, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import { ErrorCode, ApiError } from './api.types';

// --- Mutex for Token Refresh ---
class Mutex {
    private promise: Promise<void> | null = null;
    private resolve: (() => void) | null = null;

    async acquire() {
        while (this.promise) {
            await this.promise;
        }
        this.promise = new Promise((resolve) => {
            this.resolve = resolve;
        });
    }

    release() {
        if (this.resolve) {
            this.resolve();
            this.promise = null;
            this.resolve = null;
        }
    }
}

const mutex = new Mutex();
const BASE_URL = 'http://localhost:3000/api';
const TIMEOUT_MS = 15000;

/**
 * Standardized Axios Base Query for Delivery Partner App.
 * Features: Offline detection, Mutex refresh, Error transformation.
 */
const axiosBaseQuery = (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
    {
        url: string;
        method: AxiosRequestConfig['method'];
        data?: AxiosRequestConfig['data'];
        params?: AxiosRequestConfig['params'];
        headers?: AxiosRequestConfig['headers'];
        timeout?: number;
    },
    unknown,
    ApiError
> => async ({ url, method, data, params, headers, timeout = TIMEOUT_MS }, _api, _extraOptions) => {
    // 1. Offline Detection
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
        return {
            error: {
                code: ErrorCode.OFFLINE,
                message: 'You are offline. Please check your connection to receive orders.',
                status: 0,
                timestamp: new Date().toISOString(),
            },
        };
    }

    try {
        const token = await AsyncStorage.getItem('delivery_token');
        const response = await axios({
            url: baseUrl + url,
            method,
            data,
            params,
            timeout,
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : '',
            },
        });
        return { data: response.data };
    } catch (axiosError) {
        const err = axiosError as AxiosError<any>;
        const status = err.response?.status;
        const errorData = err.response?.data;

        // 2. Token Refresh Logic
        if (status === 401) {
            await mutex.acquire();
            try {
                const refreshToken = await AsyncStorage.getItem('delivery_refresh_token');
                if (refreshToken) {
                    const refreshResult = await axios.post(`${baseUrl}/delivery/auth/refresh`, { refreshToken });
                    if (refreshResult.data.accessToken) {
                        await AsyncStorage.setItem('delivery_token', refreshResult.data.accessToken);
                        mutex.release();
                        return axiosBaseQuery({ baseUrl })({ url, method, data, params, headers, timeout }, _api, _extraOptions);
                    }
                }
            } catch (refreshErr) {
                console.error('[BaseApi] Delivery refresh failed:', refreshErr);
                await AsyncStorage.multiRemove(['delivery_token', 'delivery_refresh_token']);
            } finally {
                mutex.release();
            }
        }

        // 3. Error Transformation
        let transformedError: ApiError = {
            status: status || 0,
            code: ErrorCode.UNKNOWN,
            message: errorData?.message || err.message || 'Error communicating with server.',
            errors: errorData?.errors,
            timestamp: new Date().toISOString(),
        };

        if (err.code === 'ECONNABORTED') {
            transformedError.code = ErrorCode.TIMEOUT;
        } else if (status === 401) {
            transformedError.code = ErrorCode.UNAUTHORIZED;
        } else if (status && status >= 500) {
            transformedError.code = ErrorCode.SERVER_ERROR;
            transformedError.message = 'High load on server. Retrying...';
        }

        // 4. Global Alerts
        if (transformedError.code === ErrorCode.SERVER_ERROR) {
            Toast.show({ type: 'error', text1: 'Server Busy', text2: transformedError.message });
        }

        return { error: transformedError };
    }
};

const staggeredBaseQuery = retry(
    axiosBaseQuery({ baseUrl: BASE_URL }),
    { maxRetries: 3 }
);

export const api = createApi({
    reducerPath: 'api',
    baseQuery: staggeredBaseQuery,
    tagTypes: ['Stats', 'Orders', 'Payments', 'Status'],
    endpoints: () => ({}),
});
