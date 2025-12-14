// Mocks for native modules that break in Jest environment

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    watchPositionAsync: jest.fn(),
    Accuracy: {
        High: 4,
    },
}));

jest.mock('expo-notifications', () => ({
    setNotificationChannelAsync: jest.fn(),
    getPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    scheduleNotificationAsync: jest.fn(),
}));

jest.mock('expo-av', () => ({
    Audio: {
        Sound: {
            createAsync: jest.fn(() => Promise.resolve({ sound: { unloadAsync: jest.fn() } })),
        },
    },
}));

jest.mock('expo-haptics', () => ({
    notificationAsync: jest.fn(),
    impactAsync: jest.fn(),
    NotificationFeedbackType: { Success: 'success', Warning: 'warning', Error: 'error' },
    ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
}));

jest.mock('lucide-react-native', () => ({
    MapPin: 'MapPin',
    Navigation: 'Navigation',
    Clock: 'Clock',
    DollarSign: 'DollarSign',
    X: 'X',
    User: 'User',
    Shield: 'Shield',
    Bell: 'Bell',
    // Add others as needed
}));

// Mock Redux Persist
jest.mock('redux-persist', () => {
    const real = jest.requireActual('redux-persist');
    return {
        ...real,
        persistReducer: jest.fn().mockImplementation((config, reducers) => reducers),
    };
});
