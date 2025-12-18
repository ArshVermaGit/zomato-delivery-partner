/**
 * Generic API Types for Zomato Delivery Ecosystem
 */

export enum ErrorCode {
    NETWORK_ERROR = 'NETWORK_ERROR',
    TIMEOUT = 'TIMEOUT',
    OFFLINE = 'OFFLINE',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    SERVER_ERROR = 'SERVER_ERROR',
    UNKNOWN = 'UNKNOWN',
}

export interface ApiError {
    status?: number;
    code: ErrorCode;
    message: string;
    errors?: Record<string, string[]>;
    timestamp: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        hasNextPage: boolean;
    };
}

/**
 * Delivery Domain Types
 */

export interface DeliveryPartnerStats {
    todayEarnings: number;
    totalDeliveries: number;
    rating: number;
    onlineTime: number; // in minutes
}

export interface ActiveOrder {
    id: string;
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    restaurantName: string;
    restaurantAddress: string;
    deliveryAddress: string;
    items: {
        name: string;
        quantity: number;
    }[];
    status: 'ASSIGNED' | 'PICKED_UP' | 'ARRIVED' | 'DELIVERED';
}
