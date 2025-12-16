import { OrderService as ApiOrderService } from '@zomato/api-client';

export const OrderService = {
    getAvailableOrders: async (latitude: number, longitude: number) => {
        try {
            const orders = await ApiOrderService.findAvailable(latitude, longitude);
            // Map...
            return orders.map((o: any) => ({
                id: o.id,
                restaurantName: o.restaurant?.name || 'Unknown Restaurant',
                restaurantAddress: o.restaurant?.address || '',
                restaurantPhone: o.restaurant?.phoneNumber || '9999999999',
                customerName: o.user?.name || 'Guest',
                customerAddress: o.deliveryAddress?.line1 || '',
                customerPhone: o.user?.phoneNumber || '9999999999',
                status: 'ACCEPTED',
                pickupLocation: o.restaurant?.name || 'Pickup',
                dropLocation: o.deliveryAddress?.city || 'Drop',
                items: o.items?.map((i: any) => ({ name: i.menuItem?.name || 'Item', quantity: i.quantity })) || [],
                pickupOTP: '1111',
                deliveryOTP: '2222',
                amount: o.totalAmount || 0,
                distanceToPickup: '2.5 km',
                distanceToDrop: '4.0 km',
                estimatedTime: '25'
            }));
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    acceptOrder: async (orderId: string) => {
        try {
            return await ApiOrderService.claimOrder(orderId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateStatus: async (orderId: string, status: 'PICKED_UP' | 'DELIVERED') => {
        try {
            if (status === 'PICKED_UP') {
                return await ApiOrderService.pickupOrder(orderId);
            } else {
                return await ApiOrderService.deliverOrder(orderId);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getHistory: async () => {
        try {
            return await ApiOrderService.listOrders({
                status: 'DELIVERED'
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }
};
