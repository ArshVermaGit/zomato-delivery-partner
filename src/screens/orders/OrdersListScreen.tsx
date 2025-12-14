import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { acceptAvailableOrder } from '../../store/slices/deliverySlice';

import OrderHistoryCard from '../../components/orders/OrderHistoryCard';
import BottomTabNav from '../../components/navigation/BottomTabNav';

type TabType = 'Available' | 'Active' | 'Completed';

const OrdersListScreen = () => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState<TabType>('Available');

    // Selectors
    const { availableOrders, activeOrder, orderHistory } = useSelector((state: RootState) => state.delivery);

    const handleAccept = (id: string) => {
        if (activeOrder) {
            Alert.alert('Limit Reached', 'You already have an active order. Finish it before accepting another.');
            return;
        }
        dispatch(acceptAvailableOrder(id));
        navigation.navigate('Home'); // Go to dashboard to see it
    };

    const renderContent = () => {
        if (activeTab === 'Available') {
            return (
                <FlatList
                    data={availableOrders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <OrderHistoryCard
                                order={item}
                                showStatus={false}
                                onPress={() => { }}
                            />
                            <TouchableOpacity
                                style={styles.acceptBtn}
                                onPress={() => handleAccept(item.id)}
                            >
                                <Text style={styles.acceptText}>Accept Order</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<Text style={styles.emptyText}>No nearby orders.</Text>}
                />
            );
        }

        if (activeTab === 'Active') {
            return (
                <View style={styles.listContent}>
                    {activeOrder ? (
                        <OrderHistoryCard
                            order={activeOrder}
                            onPress={() => navigation.navigate('OrderDetail')}
                        />
                    ) : (
                        <Text style={styles.emptyText}>No active orders.</Text>
                    )}
                </View>
            );
        }

        if (activeTab === 'Completed') {
            return (
                <FlatList
                    data={orderHistory}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <OrderHistoryCard order={item} />}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<Text style={styles.emptyText}>No completed orders yet.</Text>}
                />
            );
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.header}>
                <Text style={styles.headerTitle}>Orders</Text>
            </SafeAreaView>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                {(['Available', 'Active', 'Completed'] as TabType[]).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.content}>
                {renderContent()}
            </View>

            <BottomTabNav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    tab: {
        marginRight: 24,
        paddingBottom: 8,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#E23744',
    },
    tabText: {
        fontSize: 16,
        color: '#888',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#E23744',
        fontWeight: '700',
    },
    content: {
        flex: 1,
    },
    listContent: {
        padding: 16,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#888',
        fontSize: 16,
    },
    acceptBtn: {
        backgroundColor: '#2FB050',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: -8,
        marginBottom: 16,
    },
    acceptText: {
        color: '#FFF',
        fontWeight: '700',
    }
});

export default OrdersListScreen;
