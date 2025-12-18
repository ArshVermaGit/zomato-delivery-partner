import { useRef } from 'react';
import { Animated } from 'react-native';

// Simple mock for Reanimated v4 features in Expo Go
const ReanimatedMock = {
    useSharedValue: (initialValue) => {
        return useRef({ value: initialValue }).current;
    },
    useAnimatedStyle: (callback) => {
        return callback(); // Return static style for mock
    },
    withTiming: (toValue, config) => {
        return toValue; // Just return the value immediately in mock
    },
    withSpring: (toValue, config) => {
        return toValue;
    },
    runOnJS: (fn) => fn,
    runOnUI: (fn) => fn,
    interpolate: (value, input, output) => {
        return value; // Simplified
    },
    Extrapolation: {
        EXTEND: 'extend',
        CLAMP: 'clamp',
        IDENTITY: 'identity',
    },
    // v4 specific if any (mostly architectural, but we mock the API)
    Easing: {
        linear: (t) => t,
        out: (f) => f,
        in: (f) => f,
        inOut: (f) => f,
    },
};

export default ReanimatedMock;
export const {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    runOnJS,
    runOnUI,
    interpolate,
    Extrapolation,
    Easing,
} = ReanimatedMock;
