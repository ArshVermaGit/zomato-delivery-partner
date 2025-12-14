import { store } from '../store';
import { setIncomingOrder } from '../store/slices/deliverySlice'; // Assuming you have this action
import { io, Socket } from 'socket.io-client';
import { Platform } from 'react-native';

class WebSocketService {
    private static instance: WebSocketService;
    private socket: Socket | null = null;
    private isConnected: boolean = false;

    private constructor() { }

    static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    connect(userId: string) {
        if (this.isConnected || this.socket) return;

        const URL = Platform.select({
            android: 'http://10.0.2.2:3000',
            ios: 'http://localhost:3000',
            default: 'http://localhost:3000',
        });

        console.log(`Connecting Socket.IO to ${URL} for user: ${userId}...`);

        this.socket = io(URL!, {
            transports: ['websocket'],
            auth: {
                userId,
                token: store.getState().auth.token
            },
            reconnection: true,
            reconnectionAttempts: 5,
        });

        this.socket.on('connect', () => {
            console.log('✅ Socket Connected:', this.socket?.id);
            this.isConnected = true;
            this.socket?.emit('joinRoom', { room: `delivery_${userId}` });
        });

        this.socket.on('disconnect', () => {
            console.log('❌ Socket Disconnected');
            this.isConnected = false;
        });

        this.socket.on('connect_error', (err) => {
            console.log('Socket Connection Error:', err.message);
        });

        // Event Listeners
        this.socket.on('order:new', (payload: any) => {
            console.log('📦 New Order Received via Socket:', payload);
            store.dispatch(setIncomingOrder(payload));
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.isConnected = false;
    }

    sendLocationUpdate(lat: number, lng: number) {
        if (!this.isConnected || !this.socket) return;
        this.socket.emit('delivery:location', { lat, lng });
    }
}

export default WebSocketService.getInstance();
