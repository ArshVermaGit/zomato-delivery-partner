declare module '@notifee/react-native' {
    export interface Notification {
        id?: string;
        title?: string;
        body?: string;
        android?: any;
        ios?: any;
        data?: { [key: string]: string };
    }

    export interface Channel {
        id: string;
        name: string;
        importance?: number;
        visibility?: number;
    }

    export const displayNotification: (notification: Notification) => Promise<void>;
    export const createChannel: (channel: Channel) => Promise<string>;
    export const createChannels: (channels: Channel[]) => Promise<void>;
    export const requestPermission: () => Promise<{ authorizationStatus: number }>;
    export const getNotificationSettings: () => Promise<{ authorizationStatus: number }>;
    export const onBackgroundEvent: (callback: (event: any) => Promise<void>) => void;
    export const onForegroundEvent: (callback: (event: any) => void) => () => void;
    export const getInitialNotification: () => Promise<any | null>;
    export const setNotificationCategories: (categories: any[]) => Promise<void>;
    export const getNotificationCategories: () => Promise<any[]>;
    export const cancelNotification: (id: string) => Promise<void>;
    export const cancelAllNotifications: () => Promise<void>;
    export const cancelDisplayedNotifications: () => Promise<void>;
    export const setBadgeCount: (count: number) => Promise<void>;
    export const getBadgeCount: () => Promise<number>;

    export enum AndroidImportance {
        NONE = 0,
        MIN = 1,
        LOW = 2,
        DEFAULT = 3,
        HIGH = 4,
    }

    export enum AndroidVisibility {
        SECRET = -1,
        PRIVATE = 0,
        PUBLIC = 1,
    }

    export enum AndroidColor {
        RED = 'red',
        BLUE = 'blue',
        GREEN = 'green',
        WHITE = 'white',
        BLACK = 'black',
    }

    export enum TriggerType {
        TIMESTAMP = 0,
        INTERVAL = 1,
    }

    export enum EventType {
        UNKNOWN = 0,
        DELIVERED = 1,
        PRESS = 2,
        DISMISSED = 3,
        ACTION_PRESS = 4,
        APP_BLOCKED = 5,
        CHANNEL_BLOCKED = 6,
        CHANNEL_GROUP_BLOCKED = 7,
    }

    export enum AuthorizationStatus {
        NOT_DETERMINED = -1,
        DENIED = 0,
        AUTHORIZED = 1,
        PROVISIONAL = 2,
    }

    const defaultExport: {
        displayNotification: typeof displayNotification;
        createChannel: typeof createChannel;
        createChannels: typeof createChannels;
        requestPermission: typeof requestPermission;
        getNotificationSettings: typeof getNotificationSettings;
        onBackgroundEvent: typeof onBackgroundEvent;
        onForegroundEvent: typeof onForegroundEvent;
        getInitialNotification: typeof getInitialNotification;
        setNotificationCategories: typeof setNotificationCategories;
        getNotificationCategories: typeof getNotificationCategories;
        cancelNotification: typeof cancelNotification;
        cancelAllNotifications: typeof cancelAllNotifications;
        cancelDisplayedNotifications: typeof cancelDisplayedNotifications;
        setBadgeCount: typeof setBadgeCount;
        getBadgeCount: typeof getBadgeCount;
        AndroidImportance: typeof AndroidImportance;
        AndroidVisibility: typeof AndroidVisibility;
        AndroidColor: typeof AndroidColor;
        TriggerType: typeof TriggerType;
        EventType: typeof EventType;
        AuthorizationStatus: typeof AuthorizationStatus;
    };

    export default defaultExport;
}
