import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../../store';
import { fetchAvailableOrders, acceptOrderThunk } from '../../store/slices/deliverySlice';
import { OrderCard } from '../../components/orders/OrderCard';
import { colors } from '@zomato/design-tokens';

type TabType = 'available' | 'active' | 'completed';

const OrdersListScreen = () => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch<AppDispatch>(); // Typed dispatch
    const [activeTab, setActiveTab] = useState<TabType>('active');
    const [refreshing, setRefreshing] = useState(false);
    const [completedFilter, setCompletedFilter] = useState('Today');

    const { availableOrders, activeOrder, orderHistory, location } = useSelector((state: RootState) => state.delivery);

    // Fetch orders on mount
    useEffect(() => {
        if (location) {
            dispatch(fetchAvailableOrders(location));
        }
    }, [dispatch, location]);

    const onRefresh = () => {
        setRefreshing(true);
        if (location) {
            dispatch(fetchAvailableOrders(location))
                .unwrap()
                .then(() => setRefreshing(false))
                .catch(() => setRefreshing(false));
        } else {
            setRefreshing(false);
        }
    };

    const handleAccept = (id: string) => {
        dispatch(acceptOrderThunk(id));
        setActiveTab('active');
    };

    const getOrders = () => {
        switch (activeTab) {
            case 'available':
                return availableOrders;
            case 'active':
                return activeOrder ? [activeOrder] : [];
            case 'completed':
                // Simple filter logic could go here
                return orderHistory;
            default:
                return [];
        }
    };

    const orders = getOrders();

    const counts = {
        available: availableOrders.length,
        active: activeOrder ? 1 : 0,
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Orders</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <TabButton
                    active={activeTab === 'available'}
                    onPress={() => setActiveTab('available')}
                >
                    Available ({counts.available})
                </TabButton>
                <TabButton
                    active={activeTab === 'active'}
                    onPress={() => setActiveTab('active')}
                >
                    Active ({counts.active})
                </TabButton>
                <TabButton
                    active={activeTab === 'completed'}
                    onPress={() => setActiveTab('completed')}
                >
                    History
                </TabButton>
            </View>

            {/* Filters (for completed) */}
            {activeTab === 'completed' && (
                <View style={styles.filters}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
                        {['Today', 'This Week', 'This Month', 'Custom'].map((filter) => (
                            <FilterChip
                                key={filter}
                                active={completedFilter === filter}
                                onPress={() => setCompletedFilter(filter)}
                            >
                                {filter}
                            </FilterChip>
                        ))}
                    </ScrollView>
                </View>
            )}

            {/* Orders List */}
            <FlatList
                data={orders}
                renderItem={({ item }) => (
                    <OrderCard
                        order={item}
                        type={activeTab}
                        onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
                        onAccept={() => handleAccept(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={<EmptyState type={activeTab} />}
            />
        </SafeAreaView>
    );
};

// Sub-components
const TabButton = ({ active, onPress, children }: { active: boolean; onPress: () => void; children: React.ReactNode }) => (
    <TouchableOpacity
        style={[styles.tabButton, active && styles.activeTabButton]}
        onPress={onPress}
    >
        <Text style={[styles.tabText, active && styles.activeTabText]}>
            {children}
        </Text>
    </TouchableOpacity>
);

const FilterChip = ({ active, onPress, children }: { active: boolean; onPress: () => void; children: React.ReactNode }) => (
    <TouchableOpacity
        style={[styles.filterChip, active && styles.activeFilterChip]}
        onPress={onPress}
    >
        <Text style={[styles.filterText, active && styles.activeFilterText]}>
            {children}
        </Text>
    </TouchableOpacity>
);

const EmptyState = ({ type }: { type: string }) => (
    <View style={styles.emptyState}>
        <Text style={styles.emptyText}>
            {type === 'available' ? 'No new orders nearby' :
                type === 'active' ? 'No active orders' :
                    'No completed orders found'}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#FFF',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    tabs: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    tabButton: {
        marginRight: 24,
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTabButton: {
        borderBottomColor: colors.primary.zomato_red,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#888',
    },
    activeTabText: {
        color: colors.primary.zomato_red,
        fontWeight: '700',
    },
    filters: {
        backgroundColor: '#FFF',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    filtersContent: {
        paddingHorizontal: 16,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    activeFilterChip: {
        backgroundColor: '#FFF0F0',
        borderColor: colors.primary.zomato_red,
    },
    filterText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
    },
    activeFilterText: {
        color: colors.primary.zomato_red,
    },
    list: {
        padding: 16,
    },
    emptyState: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
        fontWeight: '500',
    },
});

export default OrdersListScreen;
