import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Location {
    lat: number;
    lng: number;
}

export interface Stats {
    deliveries: number;
    onlineHours: number;
    acceptanceRate: number; // percentage
    rating: number;
}

export interface Earnings {
    today: number;
    week: number;
    pending: number;
}

export interface OrderItem {
    name: string;
    quantity: number;
}

export interface ActiveOrder {
    id: string;
    restaurantName: string;
    restaurantAddress: string;
    restaurantPhone: string;
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    status: 'ACCEPTED' | 'ARRIVED_RESTAURANT' | 'PICKED_UP' | 'ARRIVED_CUSTOMER' | 'DELIVERED';
    pickupLocation: string; // Short version
    dropLocation: string;   // Short version
    items: OrderItem[];
    pickupOTP: string;
    deliveryOTP: string;
    amount: number;
}

export interface Incentive {
    id: string;
    title: string;
    description: string;
    target: number;
    current: number;
    reward: number;
    expiry: string;
    type: 'DAILY' | 'PEAK';
}

export interface Feedback {
    id: string;
    rating: number;
    comment: string;
    customerName: string;
    date: string;
}

export interface Vehicle {
    type: 'Bike' | 'Scooter' | 'Cycle';
    model: string;
    plate: string;
    license: string;
}

export interface Document {
    id: string;
    name: string;
    status: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'EXPIRED';
    expiry?: string;
}

export interface BankDetails {
    holder: string;
    account: string;
    ifsc: string;
    bankName: string;
}

export interface DeliveryProfile {
    vehicle: Vehicle;
    documents: Document[];
    bankDetails: BankDetails;
    emergencyContact: {
        name: string;
        phone: string;
    };
}

export interface EmergencyContact {
    id: string;
    name: string;
    phone: string;
    relation: string;
}

export interface Transaction {
    id: string;
    date: string;
    type: 'ORDER' | 'PAYOUT' | 'BONUS';
    amount: number;
    description: string;
}

export interface Payout {
    id: string;
    date: string;
    amount: number;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    method: 'INSTANT' | 'WEEKLY';
}

export interface DeliveryState {
    isOnline: boolean;
    location: Location | null;
    stats: Stats;
    earnings: Earnings;
    activeOrder: ActiveOrder | null;
    incomingOrder: ActiveOrder | null;
    availableOrders: ActiveOrder[];
    orderHistory: ActiveOrder[];
    transactions: Transaction[];
    payouts: Payout[];
    incentives: Incentive[];
    feedback: Feedback[];
    profile: DeliveryProfile;
    safety: {
        sosActive: boolean;
        emergencyContacts: EmergencyContact[];
    };
}

const initialState: DeliveryState = {
    isOnline: false,
    location: null,
    stats: {
        deliveries: 12,
        onlineHours: 4.5,
        acceptanceRate: 95,
        rating: 4.8
    },
    earnings: {
        today: 450,
        week: 3200,
        pending: 1200 // "Available Balance"
    },
    activeOrder: null,
    incomingOrder: null,
    availableOrders: [
        // Mock Data for Available Orders
        {
            id: 'ORD-5566',
            restaurantName: 'Pizza Hut',
            restaurantAddress: 'Sector 18, Noida',
            restaurantPhone: '1234567890',
            customerName: 'Aman Gupta',
            customerAddress: 'Sector 16, Noida',
            customerPhone: '0987654321',
            status: 'ACCEPTED',
            pickupLocation: 'Sec 18',
            dropLocation: 'Sec 16',
            items: [{ name: 'Pepperoni Pizza', quantity: 1 }],
            pickupOTP: '1111',
            deliveryOTP: '2222',
            amount: 85
        },
        {
            id: 'ORD-9988',
            restaurantName: 'KFC',
            restaurantAddress: 'DLF Mall, Noida',
            restaurantPhone: '1234567890',
            customerName: 'Priya Singh',
            customerAddress: 'Sector 25, Noida',
            customerPhone: '0987654321',
            status: 'ACCEPTED',
            pickupLocation: 'DLF Mall',
            dropLocation: 'Sec 25',
            items: [{ name: 'Bucket Meal', quantity: 1 }],
            pickupOTP: '3333',
            deliveryOTP: '4444',
            amount: 110
        }
    ],
    orderHistory: [],
    transactions: [
        { id: 'TXN-1', date: 'Today, 2:30 PM', type: 'ORDER', amount: 85, description: 'Order #ORD-5566' },
        { id: 'TXN-2', date: 'Yesterday', type: 'PAYOUT', amount: -2000, description: 'Weekly Payout' },
        { id: 'TXN-3', date: 'Yesterday', type: 'ORDER', amount: 120, description: 'Order #ORD-1122' }
    ],
    payouts: [
        { id: 'PAY-1', date: 'Yesterday', amount: 2000, status: 'COMPLETED', method: 'WEEKLY' }
    ],
    incentives: [
        {
            id: 'INC-1',
            title: 'Daily Target',
            description: 'Complete 15 deliveries today',
            target: 15,
            current: 12,
            reward: 250,
            expiry: '5h 30m',
            type: 'DAILY'
        },
        {
            id: 'INC-2',
            title: 'Dinner Peak Bonus',
            description: 'Complete 5 deliveries between 7PM-11PM',
            target: 5,
            current: 2,
            reward: 100,
            expiry: '2h 15m',
            type: 'PEAK'
        }
    ],
    feedback: [
        { id: 'FB-1', rating: 5, comment: 'Very polite delivery partner!', customerName: 'Rahul', date: 'Today' },
        { id: 'FB-2', rating: 5, comment: 'Fast service. Thanks.', customerName: 'Sneha', date: 'Yesterday' },
        { id: 'FB-3', rating: 4, comment: 'Food was slightly spilt.', customerName: 'Amit', date: '2 days ago' }
    ],
    profile: {
        vehicle: {
            type: 'Bike',
            model: 'Honda Splendor Plus',
            plate: 'UP16 AB 1234',
            license: 'DL-123456789012345'
        },
        documents: [
            { id: 'DOC-1', name: 'Driving License', status: 'VERIFIED', expiry: '12/2028' },
            { id: 'DOC-2', name: 'Vehicle RC', status: 'VERIFIED', expiry: '05/2030' },
            { id: 'DOC-3', name: 'Aadhar Card', status: 'VERIFIED' },
            { id: 'DOC-4', name: 'Insurance', status: 'EXPIRED', expiry: '01/2024' }
        ],
        bankDetails: {
            holder: 'Arsh Verma',
            account: '987654321012',
            ifsc: 'HDFC0001234',
            bankName: 'HDFC Bank'
        },
        emergencyContact: {
            name: 'Ravi Verma',
            phone: '9876500000'
        }
    },
    safety: {
        sosActive: false,
        emergencyContacts: [
            { id: 'EC-1', name: 'Ravi Verma', phone: '9876500000', relation: 'Brother' },
            { id: 'EC-2', name: 'Zomato EMS', phone: '100', relation: 'Support' }
        ]
    }
};

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
        setActiveOrder: (state, action: PayloadAction<ActiveOrder | null>) => {
            state.activeOrder = action.payload;
        },
        setIncomingOrder: (state, action: PayloadAction<ActiveOrder | null>) => {
            state.incomingOrder = action.payload;
        },
        acceptIncomingOrder: (state) => {
            if (state.incomingOrder) {
                state.activeOrder = {
                    ...state.incomingOrder,
                    status: 'ACCEPTED'
                };
                state.incomingOrder = null;
            }
        },
        acceptAvailableOrder: (state, action: PayloadAction<string>) => {
            const orderIndex = state.availableOrders.findIndex(o => o.id === action.payload);
            if (orderIndex !== -1 && !state.activeOrder) {
                state.activeOrder = state.availableOrders[orderIndex];
                state.availableOrders.splice(orderIndex, 1);
            }
        },
        rejectIncomingOrder: (state) => {
            state.incomingOrder = null;
        },
        updateOrderStatus: (state, action: PayloadAction<ActiveOrder['status']>) => {
            if (state.activeOrder) {
                state.activeOrder.status = action.payload;
            }
        },
        completeOrder: (state) => {
            if (state.activeOrder) {
                const amount = state.activeOrder.amount;
                state.earnings.today += amount;
                state.earnings.pending += amount; // Add to withdrawable balance
                state.stats.deliveries += 1;
                state.activeOrder.status = 'DELIVERED';
                state.orderHistory.unshift(state.activeOrder);

                // Add transaction
                state.transactions.unshift({
                    id: `TXN-${Date.now()}`,
                    date: 'Just now',
                    type: 'ORDER',
                    amount: amount,
                    description: `Order #${state.activeOrder.id}`
                });

                state.activeOrder = null;
            }
        },
        requestPayout: (state, action: PayloadAction<{ amount: number, method: 'INSTANT' | 'WEEKLY' }>) => {
            const { amount, method } = action.payload;
            if (state.earnings.pending >= amount) {
                state.earnings.pending -= amount;
                state.payouts.unshift({
                    id: `PAY-${Date.now()}`,
                    date: 'Just now',
                    amount,
                    status: 'PENDING',
                    method
                });
                state.transactions.unshift({
                    id: `TXN-${Date.now()}`,
                    date: 'Just now',
                    type: 'PAYOUT',
                    amount: -amount,
                    description: `${method === 'INSTANT' ? 'Instant' : 'Standard'} Payout`
                });
            }
        }
    }
});

export const {
    setAvailability,
    updateLocation,
    setActiveOrder,
    setIncomingOrder,
    acceptIncomingOrder,
    acceptAvailableOrder,
    rejectIncomingOrder,
    updateOrderStatus,
    completeOrder,
    requestPayout
} = deliverySlice.actions;

export default deliverySlice.reducer;
