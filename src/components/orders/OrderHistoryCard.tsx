import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, MapPin, IndianRupee } from 'lucide-react-native';
import { ActiveOrder } from '../../store/slices/deliverySlice';

interface Props {
    order: ActiveOrder;
    onPress?: () => void;
    showStatus?: boolean;
}

const OrderHistoryCard: React.FC<Props> = ({ order, onPress, showStatus = true }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.header}>
                <View style={styles.idContainer}>
                    <Text style={styles.orderId}>#{order.id}</Text>
                    <Text style={styles.date}>Today, 2:30 PM</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹{order.amount}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.details}>
                <View style={styles.row}>
                    <Text style={styles.restaurantName}>{order.restaurantName}</Text>
                    {showStatus && (
                        <View style={[styles.statusBadge, order.status === 'DELIVERED' ? styles.statusSuccess : styles.statusActive]}>
                            <Text style={[styles.statusText, order.status === 'DELIVERED' ? styles.textSuccess : styles.textActive]}>
                                {order.status === 'DELIVERED' ? 'Delivered' : 'Active'}
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.locationRow}>
                    <MapPin size={14} color="#666" style={{ marginRight: 4 }} />
                    <Text style={styles.location}>{order.pickupLocation} → {order.dropLocation}</Text>
                </View>
            </View>

            {order.status !== 'DELIVERED' && !showStatus && (
                // Only for "Available" items which pass showStatus=false usually or handle differently
                <View style={{ marginTop: 12 }}>
                    <Text style={{ color: '#2FB050', fontWeight: '700' }}>Accept Order</Text>
                </View>
            )}

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    idContainer: {},
    orderId: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    priceContainer: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    price: {
        fontWeight: '700',
        color: '#1C1C1C',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: 12,
    },
    details: {},
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1C',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    statusSuccess: {
        backgroundColor: '#E8F5E9',
    },
    statusActive: {
        backgroundColor: '#E3F2FD',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
    },
    textSuccess: {
        color: '#2FB050',
    },
    textActive: {
        color: '#2196F3',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        fontSize: 13,
        color: '#666',
    }
});

export default OrderHistoryCard;
