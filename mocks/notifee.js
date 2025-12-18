/**
 * @notifee/react-native Mock Implementation
 * 
 * This mock allows the app to run in Expo Go without crashing due to native module dependencies.
 * It logs all calls for debugging and returns predictable mock data.
 */

const NotifeeMock = {
    // Basic APIs
    displayNotification: async (notification) => {
        console.log('[Notifee Mock] displayNotification:', JSON.stringify(notification, null, 2));
        return Promise.resolve();
    },
    createChannel: async (channel) => {
        console.log('[Notifee Mock] createChannel:', channel.id);
        return Promise.resolve(channel.id);
    },
    createChannels: async (channels) => {
        console.log('[Notifee Mock] createChannels:', channels.length);
        return Promise.resolve();
    },
    requestPermission: async () => {
        console.log('[Notifee Mock] requestPermission');
        return Promise.resolve({ authorizationStatus: 1 }); // AUTHORIZED
    },
    getNotificationSettings: async () => {
        return Promise.resolve({ authorizationStatus: 1 });
    },

    // Event Listeners
    onBackgroundEvent: (callback) => {
        console.log('[Notifee Mock] onBackgroundEvent registered');
    },
    onForegroundEvent: (callback) => {
        console.log('[Notifee Mock] onForegroundEvent registered');
        return () => { }; // Unsubscribe function
    },

    // Lifecycle
    getInitialNotification: async () => {
        return Promise.resolve(null);
    },

    // Category & Action Management
    setNotificationCategories: async (categories) => {
        console.log('[Notifee Mock] setNotificationCategories:', categories.length);
        return Promise.resolve();
    },
    getNotificationCategories: async () => {
        return Promise.resolve([]);
    },

    // Cancellation
    cancelNotification: async (id) => {
        console.log('[Notifee Mock] cancelNotification:', id);
        return Promise.resolve();
    },
    cancelAllNotifications: async () => {
        console.log('[Notifee Mock] cancelAllNotifications');
        return Promise.resolve();
    },
    cancelDisplayedNotifications: async () => {
        return Promise.resolve();
    },

    // Badge Management
    setBadgeCount: async (count) => {
        console.log('[Notifee Mock] setBadgeCount:', count);
        return Promise.resolve();
    },
    getBadgeCount: async () => {
        return Promise.resolve(0);
    },

    // --- Enums ---

    AndroidImportance: {
        NONE: 0,
        MIN: 1,
        LOW: 2,
        DEFAULT: 3,
        HIGH: 4,
    },
    AndroidVisibility: {
        SECRET: -1,
        PRIVATE: 0,
        PUBLIC: 1,
    },
    AndroidColor: {
        RED: 'red',
        BLUE: 'blue',
        GREEN: 'green',
        WHITE: 'white',
        BLACK: 'black',
    },
    AndroidStyle: {
        BIGPICTURE: 0,
        BIGTEXT: 1,
        INBOX: 2,
        MESSAGING: 3,
    },
    TriggerType: {
        TIMESTAMP: 0,
        INTERVAL: 1,
    },
    EventType: {
        UNKNOWN: 0,
        DELIVERED: 1,
        PRESS: 2,
        DISMISSED: 3,
        ACTION_PRESS: 4,
        APP_BLOCKED: 5,
        CHANNEL_BLOCKED: 6,
        CHANNEL_GROUP_BLOCKED: 7,
    },
    AuthorizationStatus: {
        NOT_DETERMINED: -1,
        DENIED: 0,
        AUTHORIZED: 1,
        PROVISIONAL: 2,
    },
};

export default NotifeeMock;

// Named exports for destructuring
export const {
    displayNotification,
    createChannel,
    createChannels,
    requestPermission,
    getNotificationSettings,
    onBackgroundEvent,
    onForegroundEvent,
    getInitialNotification,
    setNotificationCategories,
    getNotificationCategories,
    cancelNotification,
    cancelAllNotifications,
    cancelDisplayedNotifications,
    setBadgeCount,
    getBadgeCount,
    AndroidImportance,
    AndroidVisibility,
    AndroidColor,
    AndroidStyle,
    TriggerType,
    EventType,
    AuthorizationStatus,
} = NotifeeMock;
