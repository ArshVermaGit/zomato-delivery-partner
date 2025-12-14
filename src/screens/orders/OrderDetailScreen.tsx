import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../store';
import { SafeAreaView } from 'react-native-safe-area-context';

import AcceptedView from './views/AcceptedView';
import ArrivedRestaurantView from './views/ArrivedRestaurantView';
import PickedUpView from './views/PickedUpView';
import ArrivedCustomerView from './views/ArrivedCustomerView';

const OrderDetailScreen = () => {
    const navigation = useNavigation();
    const { activeOrder } = useSelector((state: RootState) => state.delivery);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `Order #${activeOrder?.id || ''}`,
            headerBackTitleVisible: false,
        });
    }, [navigation, activeOrder]);

    if (!activeOrder) {
        return (
            <View style={styles.center}>
                <Text>No active order</Text>
            </View>
        );
    }

    const renderView = () => {
        switch (activeOrder.status) {
            case 'ACCEPTED':
                return <AcceptedView order={activeOrder} />;
            case 'ARRIVED_RESTAURANT':
                return <ArrivedRestaurantView order={activeOrder} />;
            case 'PICKED_UP':
                return <PickedUpView order={activeOrder} />;
            case 'ARRIVED_CUSTOMER':
                return <ArrivedCustomerView order={activeOrder} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.content}>
                {renderView()}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        flexGrow: 1,
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default OrderDetailScreen;
