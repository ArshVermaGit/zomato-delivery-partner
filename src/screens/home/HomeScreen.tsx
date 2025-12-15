import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '@zomato/design-tokens';
import { Button } from '@zomato/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setIncomingOrder } from '../../store/slices/deliverySlice';
import { Bell, User, Shield } from 'lucide-react-native';

import AvailabilityToggle from '../../components/dashboard/AvailabilityToggle';
import EarningsCard from '../../components/dashboard/EarningsCard';
import StatsGrid from '../../components/dashboard/StatsGrid';
import ActiveOrderCard from '../../components/dashboard/ActiveOrderCard';
import BottomTabNav from '../../components/navigation/BottomTabNav';

import { useNavigation } from '@react-navigation/native';

import LocationService from '../../services/LocationService';
import WebSocketService from '../../services/WebSocketService';
import NotificationService from '../../services/NotificationService';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { isOnline, stats, earnings, activeOrder, incomingOrder } = useSelector((state: RootState) => state.delivery);

    const firstName = user?.name ? user.name.split(' ')[0] : 'Partner';

    // Service Integrations
    React.useEffect(() => {
        NotificationService.configure();
    }, []);

    React.useEffect(() => {
        if (isOnline) {
            LocationService.startTracking();
            WebSocketService.connect(user?.id || 'guest');
        } else {
            LocationService.stopTracking();
            WebSocketService.disconnect();
        }
    }, [isOnline]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <View style={styles.avatar}>
                            <User size={24} color="#FFF" />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Welcome back,</Text>
                        <Text style={styles.nameText}>Partner</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.safetyBtn}
                        onPress={() => navigation.navigate('SafetyCenter')}
                    >
                        <Shield size={20} color="#1C1C1C" />
                    </TouchableOpacity>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{isOnline ? 'ONLINE' : 'OFFLINE'}</Text>
                    </View>
                </View>
            </View>

            {isOnline && !activeOrder && !incomingOrder && (
                <TouchableOpacity
                    style={styles.simButton}
                    onPress={() => dispatch(setIncomingOrder({
                        id: 'ORD-1234',
                        restaurantName: 'Burger King',
                        restaurantAddress: 'G-12, Sector 18, Noida, Uttar Pradesh',
                        restaurantPhone: '9876543210',
                        customerName: 'Rahul Kumar',
                        customerAddress: 'B-404, Ace City, Sector 1, Noida Extension',
                        customerPhone: '9988776655',
                        status: 'ACCEPTED', // Will be set to ACCEPTED on accept
                        pickupLocation: 'Sec 18',
                        dropLocation: 'Sec 1',
                        items: [
                            { name: 'Whopper Meal', quantity: 2 },
                            { name: 'Coke', quantity: 2 },
                            { name: 'Fries (L)', quantity: 1 }
                        ],
                        pickupOTP: '1234',
                        deliveryOTP: '5678',
                        amount: 145
                    }))}
                >
                    <Text style={styles.simText}>Simulate Incoming Order</Text>
                </TouchableOpacity>
            )}

            <ScrollView contentContainerStyle={styles.content}>
                <AvailabilityToggle isOnline={isOnline} />

                {activeOrder && (
                    <TouchableOpacity onPress={() => navigation.navigate('OrderDetail')}>
                        <ActiveOrderCard order={activeOrder} />
                    </TouchableOpacity>
                )}

                <EarningsCard todayEarnings={earnings.today} />

                <TouchableOpacity onPress={() => navigation.navigate('Incentives')}>
                    <View style={styles.incentiveBanner}>
                        <View>
                            <Text style={styles.incTitle}>🔥 ₹350 Bonus Available!</Text>
                            <Text style={styles.incSub}>Complete 3 more deliveries to unlock</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Performance')}>
                    <StatsGrid stats={stats} />
                </TouchableOpacity>
            </ScrollView>

            <BottomTabNav />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1C1C1C',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    welcomeContainer: {
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    nameText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    safetyBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    statusBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        color: '#2E7D32',
        fontSize: 12,
        fontWeight: '700',
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
    },
    simButton: {
        backgroundColor: '#333',
        padding: 10,
        margin: 20,
        marginBottom: 0,
        borderRadius: 8,
        alignItems: 'center',
    },
    simText: {
        color: '#FFF',
        fontWeight: '700',
    },
    incentiveBanner: {
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#FFCDD2',
        backgroundColor: colors.secondary.white,
    },
    incTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#E23744',
        marginBottom: 2,
    },
    incSub: {
        fontSize: 12,
        color: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.secondary.gray_900,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: colors.secondary.gray_600,
        marginBottom: 20,
    },
});

export default HomeScreen;
