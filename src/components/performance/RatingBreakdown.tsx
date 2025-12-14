import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

const RatingBreakdown = () => {
    // Mock distribution
    const ratings = [
        { star: 5, percent: 80, count: 45 },
        { star: 4, percent: 15, count: 8 },
        { star: 3, percent: 5, count: 3 },
        { star: 2, percent: 0, count: 0 },
        { star: 1, percent: 0, count: 0 },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rating Breakdown</Text>
            {ratings.map((item) => (
                <View key={item.star} style={styles.row}>
                    <View style={styles.starLabel}>
                        <Text style={styles.starText}>{item.star}</Text>
                        <Star size={10} color="#FF9800" fill="#FF9800" style={{ marginLeft: 2 }} />
                    </View>
                    <View style={styles.barBg}>
                        <View style={[styles.barFill, { width: `${item.percent}%` }]} />
                    </View>
                    <Text style={styles.countText}>{item.count}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    starLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 30,
    },
    starText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    barBg: {
        flex: 1,
        height: 6,
        backgroundColor: '#F0F0F0',
        borderRadius: 3,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        backgroundColor: '#FF9800',
        borderRadius: 3,
    },
    countText: {
        fontSize: 12,
        color: '#888',
        width: 24,
        textAlign: 'right',
    }
});

export default RatingBreakdown;
