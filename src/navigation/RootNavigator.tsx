import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';

import AuthStack from './AuthStack';
import OnboardingStack from './OnboardingStack';
import MainStack from './MainStack';
import IncomingOrderModal from '../components/orders/IncomingOrderModal';
import { RootState } from '../store';

const Stack = createStackNavigator();

const RootNavigator = () => {
    const { isAuthenticated, onboardingStatus } = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate splash checks
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: '#E23744', justifyContent: 'center', alignItems: 'center' }}>
                {/* Splash Logo would go here */}
                <ActivityIndicator color="white" size="large" />
            </View>
        );
    }

    return (
        <>
            <NavigationContainer linking={linking}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {!isAuthenticated ? (
                        <Stack.Screen name="Auth" component={AuthStack} />
                    ) : onboardingStatus !== 'APPROVED' ? (
                        <Stack.Screen name="Onboarding" component={OnboardingStack} />
                    ) : (
                        <Stack.Screen name="Main" component={MainStack} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
            <IncomingOrderModal />
        </>
    );
};

export default RootNavigator;
