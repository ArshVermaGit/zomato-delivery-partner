import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DeliveryOnboardingScreen } from '../screens/onboarding/DeliveryOnboardingScreen';
import DocumentUploadScreen from '../screens/onboarding/DocumentUploadScreen';
import VehicleDetailsScreen from '../screens/onboarding/VehicleDetailsScreen';
import BankDetailsScreen from '../screens/onboarding/BankDetailsScreen';
import VerificationStatusScreen from '../screens/onboarding/VerificationStatusScreen';
import { OnboardingStackParamList } from './navigation.types';

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerTitle: '', headerTintColor: '#1C1C1C' }}>
            <Stack.Screen
                name="OnboardingWelcome"
                component={DeliveryOnboardingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DocumentUpload"
                component={DocumentUploadScreen}
                options={{ title: 'Upload Documents' }}
            />
            <Stack.Screen
                name="VehicleDetails"
                component={VehicleDetailsScreen}
                options={{ title: 'Vehicle Details' }}
            />
            <Stack.Screen
                name="BankDetails"
                component={BankDetailsScreen}
                options={{ title: 'Bank Details' }}
            />
            <Stack.Screen
                name="VerificationStatus"
                component={VerificationStatusScreen}
                options={{ headerShown: false, gestureEnabled: false }}
            />
        </Stack.Navigator>
    );
};

export default OnboardingStack;
