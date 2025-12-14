import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bike, Clock, Percent, Star } from 'lucide-react-native';
import { Stats } from '../../store/slices/deliverySlice';

interface Props {
    stats: Stats;
}

const StatsGrid: React.FC<Props> = React.memo(({ stats }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.card}>
                    <Bike size={24} color="#2196F3" style={styles.icon} />
                    <Text style={styles.value}>{stats.deliveries}</Text>
                    <Text style={styles.label}>Orders</Text>
                </View>
                <View style={styles.card}>
                    <Clock size={24} color="#FF9800" style={styles.icon} />
                    <Text style={styles.value}>{stats.onlineHours}h</Text>
                    <Text style={styles.label}>Online</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.card}>
                    <Star size={24} color="#FFC107" style={styles.icon} />
                    <Text style={styles.value}>{stats.rating}</Text>
                    <Text style={styles.label}>Rating</Text>
                </View>
                <View style={styles.card}>
                    <Percent size={24} color="#4CAF50" style={styles.icon} />
                    <Text style={styles.value}>{stats.acceptanceRate}%</Text>
                    <Text style={styles.label}>Acceptance</Text>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        gap: 12,
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    card: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    icon: {
        marginBottom: 8,
    },
    value: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: 2,
    },
    label: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    }
});

export default StatsGrid;
