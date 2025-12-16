import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
    withRepeat,
    Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Collection of reusable animations
export const DeliveryAnimations = {
    // Toggle Online/Offline
    toggleOnlineAnimation: () => {
        const scale = useSharedValue(1);

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
        }));

        const animate = () => {
            scale.value = withSequence(
                withSpring(0.9, { damping: 10 }),
                withSpring(1.1, { damping: 10 }),
                withSpring(1, { damping: 15 })
            );
        };

        return { animatedStyle, animate };
    },

    // Order Accept Celebration
    acceptCelebration: () => {
        const scale = useSharedValue(0);
        const opacity = useSharedValue(0);

        useEffect(() => {
            scale.value = withSpring(1);
            opacity.value = withTiming(1, { duration: 300 });
        }, []);

        return useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        }));
    },

    // Earnings Counter
    earningsCounter: (from: number, to: number, duration = 1000) => {
        const value = useSharedValue(from);

        useEffect(() => {
            value.value = withTiming(to, { duration, easing: Easing.out(Easing.cubic) });
        }, [to, duration]);

        return value;
    },

    // Status Change Pulse
    statusPulse: () => {
        const scale = useSharedValue(1);

        useEffect(() => {
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.1, { duration: 500 }),
                    withTiming(1, { duration: 500 })
                ),
                -1,
                true
            );
        }, []);

        return useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
    },

    // Swipe to Delete - Removed due to Reanimated v4 incompatibility (useAnimatedGestureHandler deprecated)
    // Future implementation should use Gesture.Pan() from react-native-gesture-handler
};

// Haptic Feedback Wrapper
export const withHaptic = (callback: () => void, type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light') => {
    return () => {
        switch (type) {
            case 'light':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                break;
            case 'medium':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                break;
            case 'heavy':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                break;
            case 'success':
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                break;
            case 'warning':
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                break;
            case 'error':
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                break;
        }
        callback();
    };
};
