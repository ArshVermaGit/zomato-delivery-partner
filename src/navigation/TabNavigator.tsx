import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Package, DollarSign, User } from 'lucide-react-native';
import { colors, typography, shadows } from '@zomato/design-tokens';
import { DeliveryHomeScreen } from '../screens/home/HomeScreen';
import OrdersListScreen from '../screens/orders/OrdersListScreen';
import EarningsScreen from '../screens/earnings/EarningsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { TabParamList } from './navigation.types';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
    // Mock active order count for now
    const activeOrderCount = 0;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.secondary.white,
                    borderTopWidth: 0,
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    ...shadows.lg,
                },
                tabBarActiveTintColor: colors.primary.zomato_red,
                tabBarInactiveTintColor: colors.secondary.gray_500,
                tabBarLabelStyle: { ...typography.caption, fontWeight: '600' },
            }}
        >
            <Tab.Screen
                name="Home"
                component={DeliveryHomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                            <Home size={24} color={color} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersListScreen}
                options={{
                    tabBarBadge: activeOrderCount > 0 ? activeOrderCount : undefined,
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                            <Package size={24} color={color} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Earnings"
                component={EarningsScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                            <DollarSign size={24} color={color} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
                            <User size={24} color={color} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabIconActive: {
        backgroundColor: colors.primary.zomato_red_tint,
    },
});
