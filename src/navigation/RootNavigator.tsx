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

import { DeliverySplashScreen } from '../screens/splash/DeliverySplashScreen';

const RootStack = createStackNavigator();

const linking = {
    prefixes: ['zomatodelivery://'],
    config: {
        screens: {
            MainStack: {
                screens: {
                    Home: 'home',
                    Orders: 'orders',
                    Earnings: 'earnings',
                    Profile: 'profile',
                },
            },
        },
    },
};

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
        return <DeliverySplashScreen onFinish={() => setIsLoading(false)} />;
    }

    return (
        <>
            <NavigationContainer linking={linking as any}>
                <RootStack.Navigator screenOptions={{ headerShown: false }}>
                    {!isAuthenticated ? (
                        <RootStack.Screen name="Auth" component={AuthStack} />
                    ) : onboardingStatus !== 'APPROVED' ? (
                        <RootStack.Screen name="DeliveryOnboarding" component={OnboardingStack} />
                    ) : (
                        <RootStack.Screen name="MainStack" component={MainStack} />
                    )}
                </RootStack.Navigator>
            </NavigationContainer>
            <IncomingOrderModal />
        </>
    );
};

export default RootNavigator;
