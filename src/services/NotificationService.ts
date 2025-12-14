import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

class NotificationService {
    private static instance: NotificationService;

    private constructor() { }

    static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    async configure() {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log('Failed to get push token for push notification!');
            return;
        }

        // const token = (await Notifications.getExpoPushTokenAsync()).data;
        // console.log('Expo Push Token:', token);
    }

    async sendLocalNotification(title: string, body: string) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                data: { data: 'goes here' },
            },
            trigger: null, // Send immediately
        });
    }
}

export default NotificationService.getInstance();
