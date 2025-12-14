import deliveryReducer, {
    setIncomingOrder,
    acceptIncomingOrder,
    rejectIncomingOrder,
    updateOrderStatus,
    completeOrder,
    ActiveOrder,
    DeliveryState
} from '../src/store/slices/deliverySlice';

// @ts-ignore
const initialState: DeliveryState = {
    isOnline: false,
    location: null,
    stats: { deliveries: 0, onlineHours: 0, acceptanceRate: 100, rating: 5.0 },
    earnings: { today: 0, week: 0, pending: 0 },
    activeOrder: null,
    incomingOrder: null,
    availableOrders: [],
    orderHistory: [],
    transactions: [],
    payouts: [],
    incentives: [],
    feedback: [],
    profile: {
        vehicle: { type: 'Bike', model: '', plate: '', license: '' },
        documents: [],
        bankDetails: { holder: '', account: '', ifsc: '', bankName: '' },
        emergencyContact: { name: '', phone: '' }
    },
    safety: { sosActive: false, emergencyContacts: [] }
};

const mockOrder: ActiveOrder = {
    id: '123',
    restaurantName: 'Test Resto',
    restaurantAddress: 'Test Addr',
    restaurantPhone: '123',
    customerName: 'Test Cust',
    customerAddress: 'Cust Addr',
    customerPhone: '456',
    status: 'ACCEPTED',
    pickupLocation: 'P1',
    dropLocation: 'D1',
    items: [],
    pickupOTP: '0000',
    deliveryOTP: '1111',
    amount: 100
};

describe('deliverySlice', () => {
    it('should handle initial state', () => {
        expect(deliveryReducer(undefined, { type: 'unknown' })).toEqual(expect.objectContaining({ isOnline: false }));
    });

    it('should handle setIncomingOrder', () => {
        const actual = deliveryReducer(initialState, setIncomingOrder(mockOrder));
        expect(actual.incomingOrder).toEqual(mockOrder);
    });

    it('should handle acceptIncomingOrder', () => {
        const stateWithIncoming = { ...initialState, incomingOrder: mockOrder };
        const actual = deliveryReducer(stateWithIncoming, acceptIncomingOrder());
        expect(actual.incomingOrder).toBeNull();
        expect(actual.activeOrder).toEqual(mockOrder);
        expect(actual.activeOrder?.status).toBe('ACCEPTED');
    });

    it('should handle rejectIncomingOrder', () => {
        const stateWithIncoming = { ...initialState, incomingOrder: mockOrder };
        const actual = deliveryReducer(stateWithIncoming, rejectIncomingOrder());
        expect(actual.incomingOrder).toBeNull();
        expect(actual.activeOrder).toBeNull();
    });

    it('should handle updateOrderStatus', () => {
        const stateWithActive = { ...initialState, activeOrder: mockOrder };
        const actual = deliveryReducer(stateWithActive, updateOrderStatus('PICKED_UP'));
        expect(actual.activeOrder?.status).toBe('PICKED_UP');
    });

    it('should handle completeOrder', () => {
        const stateWithActive = { ...initialState, activeOrder: { ...mockOrder, status: 'PICKED_UP' } as ActiveOrder };
        const actual = deliveryReducer(stateWithActive, completeOrder());

        expect(actual.activeOrder).toBeNull();
        expect(actual.earnings.today).toBe(100);
        expect(actual.earnings.pending).toBe(100);
        expect(actual.stats.deliveries).toBe(1);
        expect(actual.orderHistory.length).toBe(1);
    });
});
