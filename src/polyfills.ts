import { Platform } from 'react-native';

/**
 * Node.js Polyfills for React Native
 * This file provides essential globals that many libraries expect (like process and Buffer).
 */

// process polyfill
if (typeof process === 'undefined') {
    global.process = require('process');
} else {
    const bProcess = require('process');
    for (const p in bProcess) {
        if (!(p in process)) {
            process[p] = bProcess[p];
        }
    }
}

// Ensure process.env exists
if (!process.env) {
    process.env = {};
}

// Set NODE_ENV if not present
process.env.NODE_ENV = __DEV__ ? 'development' : 'production';

// Buffer polyfill
if (typeof Buffer === 'undefined') {
    global.Buffer = require('buffer').Buffer;
}

/**
 * Platform specific polyfills can be added here
 */
if (Platform.OS === 'web') {
    // Web specific polyfills if any
}
