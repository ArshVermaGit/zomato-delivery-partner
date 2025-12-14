import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Navigation2, MapPin } from 'lucide-react-native';
import { ActiveOrder } from '../../store/slices/deliverySlice';

interface Props {
    order: ActiveOrder;
}

const ActiveOrderCard: React.FC<Props> = ({ order }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.liveIndicator}>
                    <View style={styles.dot} />
                    <Text style={styles.liveText}>Active Order</Text>
                </View>
                <Text style={styles.status}>{order.status.replace('_', ' ')}</Text>
            </View>

            <View style={styles.details}>
                <Text style={styles.restaurantName}>{order.restaurantName}</Text>
                <Text style={styles.customerName}>{order.customerName}</Text>

                <View style={styles.locationContainer}>
                    <View style={styles.locationRow}>
                        <MapPin size={16} color="#E23744" />
                        <Text style={styles.locationText} numberOfLines={1}>{order.pickupLocation}</Text>
                    </View>
                    <View style={styles.dashLine} />
                    <View style={styles.locationRow}>
                        <MapPin size={16} color="#2FB050" />
                        <Text style={styles.locationText} numberOfLines={1}>{order.dropLocation}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.actionButton}>
                <Navigation2 size={20} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.buttonText}>Navigate</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E23744',
        shadowColor: '#E23744',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    liveIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F1',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E23744',
        marginRight: 6,
    },
    liveText: {
        fontSize: 12,
        color: '#E23744',
        fontWeight: '600',
    },
    status: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    details: {
        marginBottom: 16,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: 4,
    },
    customerName: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    locationContainer: {
        gap: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 14,
        color: '#444',
        marginLeft: 8,
        flex: 1,
    },
    dashLine: {
        width: 1,
        height: 12,
        backgroundColor: '#DDD',
        marginLeft: 7,
    },
    actionButton: {
        backgroundColor: '#E23744',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default ActiveOrderCard;
