import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Star } from 'lucide-react-native';

import StatsGrid from '../../components/dashboard/StatsGrid';
import RatingBreakdown from '../../components/performance/RatingBreakdown';

const PerformanceScreen = () => {
    const { stats, feedback } = useSelector((state: RootState) => state.delivery);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header Rating */}
                <View style={styles.ratingHeader}>
                    <Text style={styles.ratingValue}>{stats.rating}</Text>
                    <View style={styles.ratingMeta}>
                        <View style={{ flexDirection: 'row' }}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} size={16} color="#FF9800" fill="#FF9800" />
                            ))}
                        </View>
                        <Text style={styles.ratingCount}>56 Ratings</Text>
                    </View>
                </View>

                <StatsGrid stats={stats} />

                <RatingBreakdown />

                <Text style={styles.sectionTitle}>Recent Feedback</Text>
                {feedback.map(item => (
                    <View key={item.id} style={styles.feedbackCard}>
                        <View style={styles.fHeader}>
                            <Text style={styles.fName}>{item.customerName}</Text>
                            <View style={styles.fRating}>
                                <Text style={styles.fRatingText}>{item.rating}</Text>
                                <Star size={10} color="#FFF" fill="#FFF" />
                            </View>
                        </View>
                        <Text style={styles.fComment}>"{item.comment}"</Text>
                        <Text style={styles.fDate}>{item.date}</Text>
                    </View>
                ))}

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
        padding: 16,
    },
    ratingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
    },
    ratingValue: {
        fontSize: 48,
        fontWeight: '800',
        color: '#1C1C1C',
        marginRight: 16,
    },
    ratingMeta: {
        justifyContent: 'center',
    },
    ratingCount: {
        color: '#888',
        marginTop: 4,
        fontSize: 13,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
        marginTop: 8,
    },
    feedbackCard: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    fHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    fName: {
        fontWeight: '700',
        color: '#333',
    },
    fRating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2FB050',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    fRatingText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '700',
        marginRight: 2,
    },
    fComment: {
        fontSize: 14,
        color: '#555',
        fontStyle: 'italic',
        marginBottom: 8,
    },
    fDate: {
        fontSize: 11,
        color: '#999',
    }
});

export default PerformanceScreen;
