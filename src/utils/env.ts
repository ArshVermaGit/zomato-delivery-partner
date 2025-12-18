import { API_URL, GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@env';

/**
 * Type-safe Environment Variables
 * This utility ensures that environment variables are present and provide sensible defaults.
 */

interface EnvConfig {
    apiUrl: string;
    googleMapsApiKey: string;
    stripePublishableKey: string;
    isDev: boolean;
}

export const env: EnvConfig = {
    apiUrl: API_URL || 'http://localhost:3000',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY || '',
    stripePublishableKey: STRIPE_PUBLISHABLE_KEY || '',
    isDev: __DEV__,
};

/**
 * Validate required environment variables here if needed
 */
if (!env.apiUrl) {
    console.warn('[Env] API_URL is not defined in .env');
}

export default env;
