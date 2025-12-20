import {
    ApiError as SharedApiError,
    ApiResponse as SharedApiResponse,
    ErrorCode as SharedErrorCode,
    Order as SharedOrder
} from '@zomato/shared-types';

/**
 * Re-exporting shared types to maintain local interface while ensuring contract sync
 */
export type ErrorCode = SharedErrorCode;
export const ErrorCode = SharedErrorCode;

export type ApiError = SharedApiError;
export type ApiResponse<T> = SharedApiResponse<T>;

/**
 * Delivery Domain Types
 */

export interface DeliveryPartnerStats {
    todayEarnings: number;
    todaysEarnings?: number; // compat
    totalDeliveries: number;
    deliveryCount?: number; // compat
    rating: number;
    onlineTime: number; // in minutes
    onlineHours?: number; // compat
    avgPerDelivery?: number;
    acceptanceRate?: number;
    onTimeRate?: number;
    completionRate?: number;
}

export type ActiveOrder = SharedOrder & {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    dropLocation?: string;
    restaurantName: string;
    restaurantAddress: string;
    pickupLocation?: string;
};
