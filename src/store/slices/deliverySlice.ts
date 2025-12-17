import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { OrderService } from '../../services/OrderService';

export interface Location {
    lat: number;
    lng: number;
}

export interface OrderItem {
    name: string;
    quantity: number;
    isVeg?: boolean;
    customizations?: string;
}

export interface ActiveOrder {
    id: string;
    displayId?: string; // e.g. "4521"
    restaurantName: string;
    restaurantAddress: string;
    pickupAddress?: string; // Add alias/field
    restaurantPhone?: string;

    customerName: string;
    customerAddress: string;
    dropAddress?: string; // Add alias
    customerPhone?: string;

    status: 'ACCEPTED' | 'ARRIVED_RESTAURANT' | 'PICKED_UP' | 'ARRIVED_CUSTOMER' | 'DELIVERED' | 'OUT_FOR_DELIVERY';

    pickupLocation?: string;
    dropLocation?: string;

    items: OrderItem[];
    amount: number;
    totalAmount?: number;
    itemsTotal?: number;
    deliveryFee?: number;
    taxes?: number;
    discount?: number;

    distanceToPickup?: string | number;
    distanceToDrop?: string | number;
    etaToPickup?: string | number;
    etaToDrop?: string | number;

    pickupOTP?: string;
    deliveryOTP?: string;
    deliveryInstructions?: string;

    paymentMethod?: 'cash' | 'online';
    tip?: number;

    earnings?: {
        baseFee: number;
        distanceBonus: number;
        peakHourBonus: number;
        total: number;
    };

    restaurantLocation?: { latitude: number; longitude: number };
    customerLocation?: { latitude: number; longitude: number };
    createdAt?: string;
}

export interface DeliveryState {
    isOnline: boolean;
    location: Location | null;
    activeOrder: ActiveOrder | null;
    availableOrders: ActiveOrder[];
    orderHistory: ActiveOrder[];
    loading: boolean;
    error: string | null;
    stats: any; // Simplified for brevity in this update
    earnings: any;
    transactions: any[];
    payouts: any[];
}

const initialState: DeliveryState = {
    isOnline: false,
    location: null,
    activeOrder: null,
    availableOrders: [],
    orderHistory: [],
    loading: false,
    error: null,
    stats: { deliveries: 0, onlineHours: 0, acceptanceRate: 100, rating: 5.0 },
    earnings: { today: 0, week: 0, pending: 0 },
    transactions: [],
    payouts: [],
};

// ... Thunks same as before, just ensuring types match ...

export const fetchAvailableOrders = createAsyncThunk(
    'delivery/fetchAvailableOrders',
    async (_, { getState }) => {
        const orders = await OrderService.getAvailableOrders();
        // Ensure proper mapping in Service to match ActiveOrder interface
        return orders;
    }
);

export const acceptOrderThunk = createAsyncThunk(
    'delivery/acceptOrder',
    async (orderId: string) => {
        const order = await OrderService.acceptOrder(orderId);
        return order;
    }
);

export const updateOrderStatusThunk = createAsyncThunk(
    'delivery/updateStatus',
    async ({ orderId, status }: { orderId: string, status: any }) => {
        const order = await OrderService.updateStatus(orderId, status);
        return order;
    }
);

const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        setAvailability: (state, action: PayloadAction<boolean>) => {
            state.isOnline = action.payload;
        },
        updateLocation: (state, action: PayloadAction<Location>) => {
            state.location = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAvailableOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAvailableOrders.fulfilled, (state, action) => {
            // @ts-ignore
            state.availableOrders = action.payload;
            state.loading = false;
        });
        builder.addCase(acceptOrderThunk.fulfilled, (state, action) => {
            // @ts-ignore
            state.activeOrder = action.payload;
            state.availableOrders = state.availableOrders.filter(o => o.id !== action.payload.id);
        });
        builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
            // @ts-ignore
            state.activeOrder = action.payload;
            if (action.payload.status === 'DELIVERED') {
                state.orderHistory.unshift(state.activeOrder as ActiveOrder);
                state.activeOrder = null;
                state.stats.deliveries += 1;
            }
        });
    }
});

export const { setAvailability, updateLocation } = deliverySlice.actions;
export default deliverySlice.reducer;
