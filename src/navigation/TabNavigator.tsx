import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Receipt, Banknote, User } from 'lucide-react-native';
import { colors, typography, shadows } from '@zomato/design-tokens';
import { DeliveryHomeScreen } from '../screens/home/HomeScreen';
import OrdersListScreen from '../screens/orders/OrdersListScreen';
import EarningsScreen from '../screens/earnings/EarningsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary.zomato_red,
                tabBarInactiveTintColor: colors.secondary.gray_500,
                tabBarStyle: {
                    backgroundColor: colors.secondary.white,
                    borderTopWidth: 0,
                    ...shadows.lg,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    ...typography.caption,
                    fontWeight: '600',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let Icon;

                    switch (route.name) {
                        case 'Home':
                            Icon = Home;
                            break;
                        case 'Orders':
                            Icon = Receipt;
                            break;
                        case 'Earnings':
                            Icon = Banknote;
                            break;
                        default:
                            Icon = User;
                    }

                    const LucideIcon = Icon as any;
                    return <LucideIcon size={24} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={DeliveryHomeScreen} />
            <Tab.Screen name="Orders" component={OrdersListScreen} />
            <Tab.Screen name="Earnings" component={EarningsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};
