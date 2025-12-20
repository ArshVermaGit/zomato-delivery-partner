import { store } from '../store';
import { updateLocation, setIsTracking } from '../store/slices/locationSlice';
import * as Location from 'expo-location';

// Note: For a real production app, we would use 'react-native-background-geolocation'.
// Since we are in an Expo implementation for now, we will use Expo Location.
// This service abstracts the provider so we can swap it later.

class LocationService {
    private static instance: LocationService;
    private subscription: Location.LocationSubscription | null = null;

    private constructor() { }

    static getInstance(): LocationService {
        if (!LocationService.instance) {
            LocationService.instance = new LocationService();
        }
        return LocationService.instance;
    }

    async requestPermissions() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        // For background:
        // const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
        return status;
    }

    async startTracking() {
        const state = store.getState();
        if (state.location.isTracking) return;

        try {
            const permission = await this.requestPermissions();
            if (permission !== 'granted') {
                console.warn('Location permission denied');
                return;
            }

            // Adaptive Tracking Logic
            // We start with high accuracy. In a real scenario, we might toggle this based on speed.
            // For example, if speed < 1 m/s (approx 3.6 km/h) for 5 minutes, switch to low power.

            // Here, we simulate adaptive config by watching speed in the callback
            this.subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000, // Update every 5s for better live tracking
                    distanceInterval: 10, // Update every 10m
                },
                (location) => {
                    // store.dispatch(updateLocation({

                    // Optimization: Only dispatch if significant change or sufficient time passed
                    // (Simplified logic here - in prod use react-native-background-geolocation's built-in stationary detection)

                    store.dispatch(updateLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        heading: location.coords.heading || 0,
                        speed: location.coords.speed || 0,
                        timestamp: location.timestamp
                    }));

                    // Example: Send to WebSocket if connected (throttled)
                    // WebSocketService.sendLocationUpdate(...)
                }
            );

            store.dispatch(setIsTracking(true));
            console.log('Location tracking started');
        } catch (error) {
            console.error('Error starting location tracking:', error);
        }
    }

    async stopTracking() {
        if (this.subscription) {
            this.subscription.remove();
            this.subscription = null;
        }
        store.dispatch(setIsTracking(false));
        console.log('Location tracking stopped');
    }
}

export default LocationService.getInstance();
