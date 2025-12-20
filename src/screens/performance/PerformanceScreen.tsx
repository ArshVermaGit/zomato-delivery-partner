import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, CheckCircle, Clock, Target } from 'lucide-react-native';
import { colors, shadows } from '@/theme';

// Local theme constants
const spacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 24, xl: 32 };
const borderRadius = { sm: 4, md: 8, lg: 12, xl: 16, full: 999 };

// Metric Card Component
const MetricCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) => (
    <View style={styles.metricCard}>
        <View style={[styles.metricIcon, { backgroundColor: `${color}15` }]}>{icon}</View>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
    </View>
);

// Feedback Item Component
const FeedbackItem = ({ rating, comment, date }: { rating: number, comment: string, date: string }) => (
    <View style={styles.feedbackItem}>
        <View style={styles.feedbackHeader}>
            <View style={styles.feedbackRating}>
                <Text style={styles.feedbackRatingText}>{rating}</Text>
                <Star size={12} color={colors.secondary.white} fill={colors.secondary.white} />
            </View>
            <Text style={styles.feedbackDate}>{date}</Text>
        </View>
        {comment ? <Text style={styles.feedbackComment}>"{comment}"</Text> : null}
    </View>
);

export const PerformanceScreen = () => {
    const metrics = {
        rating: 4.8,
        acceptanceRate: 92,
        onTimeRate: 95,
        completionRate: 98,
        totalDeliveries: 342,
    };

    const feedbackList = [
        { id: '1', rating: 5, comment: 'Very polite and fast delivery!', date: 'Today, 2:30 PM' },
        { id: '2', rating: 5, comment: '', date: 'Yesterday, 8:15 PM' },
        { id: '3', rating: 4, comment: 'Food was slightly spilled.', date: 'Dec 12, 1:00 PM' },
        { id: '4', rating: 5, comment: 'Excellent service.', date: 'Dec 10, 9:45 PM' },
    ];

    const getStarColor = (star: number) => {
        if (star >= 4) return '#2FB050'; // colors.success
        if (star === 3) return '#FBC02D'; // colors.warning
        return colors.primary.zomato_red;
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Overall Rating */}
                <View style={styles.ratingCard}>
                    <View style={styles.ratingCircle}>
                        <Text style={styles.ratingNumber}>{metrics.rating}</Text>
                        <View style={styles.stars}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star
                                    key={i}
                                    size={16}
                                    color={i <= Math.round(metrics.rating) ? '#FFC107' : '#E0E0E0'} // Gold for active
                                    fill={i <= Math.round(metrics.rating) ? '#FFC107' : 'transparent'}
                                />
                            ))}
                        </View>
                    </View>
                    <Text style={styles.ratingLabel}>Overall Rating</Text>
                    <Text style={styles.deliveriesCount}>{metrics.totalDeliveries} deliveries</Text>
                </View>

                {/* Rating Distribution */}
                <View style={styles.distributionCard}>
                    <Text style={styles.sectionTitle}>Rating Breakdown</Text>
                    {[5, 4, 3, 2, 1].map((star, index) => {
                        // Mock distribution values
                        const percentage = [85, 10, 3, 1, 1][index];
                        return (
                            <View key={star} style={styles.ratingRow}>
                                <Text style={styles.starLabel}>{star}★</Text>
                                <View style={styles.ratingBar}>
                                    <View style={[styles.ratingBarFill, { width: `${percentage}%`, backgroundColor: getStarColor(star) }]} />
                                </View>
                                <Text style={styles.ratingPercentage}>{percentage}%</Text>
                            </View>
                        );
                    })}
                </View>

                {/* Performance Metrics Grid */}
                <View style={styles.metricsGrid}>
                    <MetricCard
                        icon={<CheckCircle size={24} color={'#2FB050'} />}
                        label="Acceptance"
                        value={`${metrics.acceptanceRate}%`}
                        color={'#2FB050'}
                    />
                    <MetricCard
                        icon={<Clock size={24} color={'#2196F3'} />} // Info Blue
                        label="On-Time"
                        value={`${metrics.onTimeRate}%`}
                        color={'#2196F3'}
                    />
                    <MetricCard
                        icon={<Target size={24} color={colors.primary.zomato_red} />}
                        label="Completion"
                        value={`${metrics.completionRate}%`}
                        color={colors.primary.zomato_red}
                    />
                </View>

                {/* Customer Feedback */}
                <View style={styles.feedbackCard}>
                    <Text style={styles.sectionTitle}>Recent Feedback</Text>
                    {feedbackList.map(item => (
                        <FeedbackItem key={item.id} rating={item.rating} comment={item.comment} date={item.date} />
                    ))}
                    <View style={styles.viewMoreContainer}>
                        <Text style={styles.viewMoreText}>View all feedback</Text>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollContent: {
        padding: spacing.base,
    },
    ratingCard: {
        alignItems: 'center',
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.base,
        ...shadows.sm,
    },
    ratingCircle: {
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    ratingNumber: {
        fontSize: 48,
        fontWeight: '700',
        color: '#1C1C1C',
        lineHeight: 56,
    },
    stars: {
        flexDirection: 'row',
        gap: 4,
        marginTop: 4,
    },
    ratingLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1C',
        marginBottom: 4,
    },
    deliveriesCount: {
        fontSize: 14,
        color: '#666',
    },
    distributionCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.sm,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: spacing.base,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    starLabel: {
        width: 30,
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    ratingBar: {
        flex: 1,
        height: 6,
        backgroundColor: '#F5F5F5',
        borderRadius: borderRadius.full,
        marginHorizontal: spacing.sm,
        overflow: 'hidden',
    },
    ratingBarFill: {
        height: '100%',
        borderRadius: borderRadius.full,
    },
    ratingPercentage: {
        width: 35,
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
    },
    metricsGrid: {
        flexDirection: 'row',
        gap: spacing.base,
        marginBottom: spacing.base,
    },
    metricCard: {
        flex: 1,
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        alignItems: 'center',
        ...shadows.sm,
    },
    metricIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    metricValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: 2,
    },
    metricLabel: {
        fontSize: 12,
        color: '#666',
    },
    feedbackCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        ...shadows.sm,
    },
    feedbackItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        paddingVertical: spacing.md,
    },
    feedbackHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    feedbackRating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2FB050',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
        marginRight: spacing.sm,
        gap: 2,
    },
    feedbackRatingText: {
        color: colors.secondary.white,
        fontSize: 12,
        fontWeight: '700',
    },
    feedbackDate: {
        fontSize: 12,
        color: '#888',
    },
    feedbackComment: {
        fontSize: 14,
        color: '#444',
        fontStyle: 'italic',
        lineHeight: 20,
    },
    viewMoreContainer: {
        paddingTop: spacing.base,
        alignItems: 'center',
    },
    viewMoreText: {
        fontSize: 14,
        color: colors.primary.zomato_red,
        fontWeight: '600',
    },
});
