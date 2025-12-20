import { OrderService as ApiOrderService } from '@zomato/api-client';
import { ActiveOrder } from '../store/slices/deliverySlice';

// Adapter utility to transform backend Order to ActiveOrder type
const transformOrder = (backendOrder: any): ActiveOrder => {
    return {
        id: backendOrder.id,
        restaurantName: backendOrder.restaurant?.name || 'Restaurant',
        restaurantAddress: backendOrder.restaurant?.address || 'Unknown Address',
        customerName: backendOrder.user?.name || 'Customer',
        customerAddress: backendOrder.address?.formattedAddress || 'Unknown Address',
        status: backendOrder.status,
        items: backendOrder.items?.map((i: any) => ({
            name: i.menuItem?.name || 'Item',
            quantity: i.quantity,
            isVeg: i.menuItem?.isVeg,
            customizations: i.customizations
        })) || [],
        amount: backendOrder.totalAmount,
        totalAmount: backendOrder.totalAmount, // Map both for safety
        itemsTotal: backendOrder.totalAmount, // Simplified
        deliveryFee: 40, // Mock for now
        taxes: 25, // Mock
        discount: 0,
        distanceToPickup: '2.5 km', // Mock
        etaToPickup: '10 mins', // Mock
        distanceToDrop: '4.5 km',
        etaToDrop: '20 mins',
        pickupOTP: '1234',
        deliveryOTP: '5678',
        deliveryInstructions: 'Leave at door',
        paymentMethod: 'online',
        tip: 20
    };
};

export const OrderService = {
    getAvailableOrders: async (location?: { lat: number, lng: number } | null): Promise<ActiveOrder[]> => {
        // Use provided location or fallback
        const lat = location?.lat || 28.5355;
        const lng = location?.lng || 77.3910;
        const orders = await ApiOrderService.findAvailable(lat, lng);
        return orders.map(transformOrder);
    },

    getActiveOrder: async (): Promise<ActiveOrder | null> => {
        // In a real app, we would fetch the order assigned to the driver
        // For now, this might just return null or we rely on Redux state persistence
        return null;
    },

    acceptOrder: async (orderId: string): Promise<ActiveOrder> => {
        const order = await ApiOrderService.claimOrder(orderId);
        return transformOrder(order);
    },

    updateStatus: async (orderId: string, status: 'PICKED_UP' | 'DELIVERED'): Promise<ActiveOrder> => {
        let order;
        if (status === 'PICKED_UP') {
            order = await ApiOrderService.pickupOrder(orderId);
        } else if (status === 'DELIVERED') {
            order = await ApiOrderService.deliverOrder(orderId);
        } else {
            // Fallback or error
            throw new Error(`Unsupported status update: ${status}`);
        }
        return transformOrder(order);
    }
};
