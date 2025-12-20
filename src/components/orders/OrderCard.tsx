import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Navigation, Package, DollarSign, Clock } from 'lucide-react-native';
import { colors, shadows } from '@zomato/design-tokens';
import { StatusBadge } from './StatusBadge';
import { ActiveOrder } from '../../store/slices/deliverySlice';

interface OrderCardProps {
    order: ActiveOrder;
    type: 'available' | 'active' | 'completed';
    onPress?: () => void;
    onAccept?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, type, onPress, onAccept }) => {
    const itemsCount = order.items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <TouchableOpacity style={styles.orderCard} onPress={onPress}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>#{order.id}</Text>
                <StatusBadge status={order.status} />
            </View>

            <View style={styles.orderLocations}>
                <LocationRow
                    icon={<MapPin size={16} color={colors.primary.zomato_red} />}
                    label={order.restaurantName}
                    distance={String(order.distanceToPickup || '--')}
                    isLast={false}
                />
                <View style={styles.locationDivider} />
                <LocationRow
                    icon={<Navigation size={16} color={colors.secondary.gray_500} />}
                    label={order.customerName}
                    distance={String(order.distanceToDrop || '--')}
                    isLast={true}
                />
            </View>

            <View style={styles.orderFooter}>
                <View style={styles.orderMeta}>
                    <MetaItem icon={<Package size={14} color="#666" />} text={`${itemsCount} items`} />
                    <MetaItem icon={<DollarSign size={14} color="#666" />} text={`₹${order.amount}`} />
                    <MetaItem icon={<Clock size={14} color="#666" />} text={`${order.estimatedTime || '--'} mins`} />
                </View>

                {type === 'available' && (
                    <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
                        <Text style={styles.acceptButtonText}>Accept</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
};

// Sub-components
const LocationRow = ({ icon, label, distance, isLast }: { icon: React.ReactNode, label: string, distance: string, isLast: boolean }) => (
    <View style={[styles.locationRow, isLast && styles.lastLocationRow]}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>{label}</Text>
            <Text style={styles.locationDistance}>{distance}</Text>
        </View>
    </View>
);

const MetaItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <View style={styles.metaItem}>
        {icon}
        <Text style={styles.metaText}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    orderCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        ...shadows.sm,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    orderId: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    orderLocations: {
        marginBottom: 16,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    lastLocationRow: {
        marginBottom: 0,
    },
    iconContainer: {
        width: 24,
        alignItems: 'center',
    },
    locationInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 8,
    },
    locationLabel: {
        fontSize: 14,
        color: '#1C1C1C',
        flex: 1,
    },
    locationDistance: {
        fontSize: 12,
        color: '#888',
        fontWeight: '500',
    },
    locationDivider: {
        height: 12,
        borderLeftWidth: 1,
        borderLeftColor: '#DDD',
        marginLeft: 12, // Center of icon
        marginTop: -8,
        marginBottom: 4,
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    orderMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    metaText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
        fontWeight: '500',
    },
    acceptButton: {
        backgroundColor: colors.primary.zomato_red,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    acceptButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '700',
    }
});
