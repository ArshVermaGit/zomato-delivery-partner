import { api } from './baseApi';
import { DeliveryPartnerStats, ActiveOrder, ApiResponse } from './api.types';

export const deliveryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getHomeStats: builder.query<DeliveryPartnerStats, void>({
            query: () => ({
                url: '/delivery/stats',
                method: 'GET',
            }),
            transformResponse: (response: ApiResponse<DeliveryPartnerStats>) => response.data,
            providesTags: ['Stats'],
        }),
        getActiveOrder: builder.query<ActiveOrder | null, void>({
            query: () => ({
                url: '/delivery/active-order',
                method: 'GET',
            }),
            transformResponse: (response: ApiResponse<ActiveOrder | null>) => response.data,
            providesTags: ['Orders'],
        }),
        toggleAvailability: builder.mutation<ApiResponse<void>, boolean>({
            query: (isOnline) => ({
                url: '/delivery/availability',
                method: 'POST',
                data: { isOnline },
            }),
            invalidatesTags: ['Stats'],
        }),
    }),
});

export const {
    useGetHomeStatsQuery,
    useGetActiveOrderQuery,
    useToggleAvailabilityMutation,
} = deliveryApi;
