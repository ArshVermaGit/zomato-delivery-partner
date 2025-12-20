import { api } from './baseApi';
import { ApiResponse } from './api.types';

export const paymentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPaymentOrder: builder.mutation<ApiResponse<any>, any>({
            query: (data) => ({
                url: '/payments/create-order',
                method: 'POST',
                data,
            }),
        }),
        createAdHocPayment: builder.mutation<ApiResponse<any>, { amount: number; purpose: string }>({
            query: (data) => ({
                url: '/payments/create-adhoc',
                method: 'POST',
                data,
            }),
        }),
        verifyPayment: builder.mutation<ApiResponse<any>, any>({
            query: (data) => ({
                url: '/payments/verify',
                method: 'POST',
                data,
            }),
        }),
    }),
});

export const {
    useCreatePaymentOrderMutation,
    useCreateAdHocPaymentMutation,
    useVerifyPaymentMutation
} = paymentsApi;
