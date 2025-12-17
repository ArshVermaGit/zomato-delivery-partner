import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { io, Socket } from 'socket.io-client';
import { Config } from '../config';

const getBaseUrl = () => Config?.API_URL || 'http://localhost:3000'; // Fallback

const LOCATION_TASK_NAME = 'background-location-task';
let socket: Socket | null = null;

// Define the background task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }: any) => {
    if (error) {
        console.error(error);
        return;
    }
    if (data) {
        const { locations } = data;
        const location = locations[0];
        if (location && socket && socket.connected) {
            console.log('Background location:', location.coords);
            socket.emit('updateLocation', {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        }
    }
});

export class LocationTrackingService {
    static async setupSocket(token: string) {
        if (socket?.connected) return;

        socket = io(`${getBaseUrl()}/location`, {
            auth: { token },
            transports: ['websocket']
        });

        socket.on('connect', () => {
            console.log('Location socket connected');
        });
    }

    static async startTracking() {
        const { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
        if (hasStarted) return;

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 10000, // 10 seconds
            distanceInterval: 10, // 10 meters
            foregroundService: {
                notificationTitle: "Zomato Delivery",
                notificationBody: "Tracking your location for delivery",
            },
        });
    }

    static async stopTracking() {
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
        if (hasStarted) {
            await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
            socket?.disconnect();
        }
    }
}
