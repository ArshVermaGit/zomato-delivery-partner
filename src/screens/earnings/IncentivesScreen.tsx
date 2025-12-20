import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Award, Target, CheckCircle } from 'lucide-react-native';
import { colors, shadows } from '@/theme';
import { CircularProgress } from '../../components/common/CircularProgress';

// Local theme constants
const spacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 24, xl: 32 };
const borderRadius = { sm: 4, md: 8, lg: 12, xl: 16, full: 999 };

// Types
interface Incentive {
    id: string;
    title: string;
    current: number;
    target: number;
    reward: number;
    expires?: string;
    completed?: boolean;
}

export const IncentivesScreen = () => {
    const activeIncentives: Incentive[] = [
        { id: '1', title: 'Complete 10 Deliveries', current: 7, target: 10, reward: 200, expires: '6h 30m' },
        { id: '2', title: 'Peak Hour Streak', current: 3, target: 5, reward: 150, expires: '2h 15m' },
    ];

    const completedIncentives: Incentive[] = [
        { id: '3', title: 'Weekend Bonus', current: 20, target: 20, reward: 500, completed: true },
        { id: '4', title: 'Perfect Rating Streak', current: 5, target: 5, reward: 300, completed: true },
    ];

    const totalEarned = 2450;
    const activeCount = activeIncentives.length;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header Stats */}
                <View style={styles.statsCard}>
                    <StatBox
                        icon={<Award size={24} color={'#FBC02D'} />}
                        label="Total Earned"
                        value={`₹${totalEarned.toLocaleString('en-IN')}`}
                        color="#FFF9C4"
                    />
                    <View style={{ width: 12 }} />
                    <StatBox
                        icon={<Target size={24} color={'#2196F3'} />}
                        label="Active"
                        value={activeCount.toString()}
                        color="#E3F2FD"
                    />
                </View>

                {/* Active Incentives */}
                <Text style={styles.sectionTitle}>Active Challenges</Text>
                {activeIncentives.map(incentive => (
                    <IncentiveCard key={incentive.id}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.title}>{incentive.title}</Text>
                            <View style={styles.rewardBadge}>
                                <Text style={styles.rewardText}>₹{incentive.reward}</Text>
                            </View>
                        </View>

                        <View style={styles.progressSection}>
                            <CircularProgress
                                value={incentive.current}
                                max={incentive.target}
                                size={50}
                                color={colors.primary.zomato_red}
                            />
                            <View style={styles.progressInfo}>
                                <Text style={styles.progressText}>
                                    <Text style={styles.progressHighlight}>{incentive.current}</Text>
                                    /{incentive.target} completed
                                </Text>
                                <Text style={styles.expiresText}>Expires in {incentive.expires}</Text>
                            </View>
                        </View>

                        {/* Linear Progress Bar */}
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${(incentive.current / incentive.target) * 100}%` }
                                ]}
                            />
                        </View>
                    </IncentiveCard>
                ))}

                {/* Completed Section */}
                <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Completed This Month</Text>
                {completedIncentives.map(incentive => (
                    <View key={incentive.id} style={styles.completedCard}>
                        <View style={styles.completedLeft}>
                            <CheckCircle size={24} color={'#2FB050'} />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.completedTitle}>{incentive.title}</Text>
                                <Text style={styles.completedSub}>Target achieved</Text>
                            </View>
                        </View>
                        <Text style={styles.completedReward}>+₹{incentive.reward}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

// Sub-components
const StatBox = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) => (
    <View style={styles.statBox}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
            {icon}
        </View>
        <View>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    </View>
);

const IncentiveCard = ({ children }: { children: React.ReactNode }) => (
    <View style={styles.incentiveCard}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollContent: {
        padding: spacing.base,
    },
    statsCard: {
        flexDirection: 'row',
        marginBottom: spacing.lg,
    },
    statBox: {
        flex: 1,
        backgroundColor: colors.secondary.white,
        padding: spacing.base,
        borderRadius: borderRadius.xl,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        ...shadows.sm,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: spacing.md,
    },
    incentiveCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.md,
        ...shadows.sm,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.base,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1C',
        flex: 1,
        marginRight: 12,
    },
    rewardBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: spacing.md,
        paddingVertical: 4,
        borderRadius: borderRadius.full,
    },
    rewardText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2FB050',
    },
    progressSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.base,
    },
    progressInfo: {
        flex: 1,
    },
    progressText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    progressHighlight: {
        fontWeight: '700',
        color: '#1C1C1C',
    },
    expiresText: {
        fontSize: 12,
        color: '#E53935', // Red
        fontWeight: '500',
    },
    progressBar: {
        height: 6,
        backgroundColor: '#F5F5F5',
        borderRadius: borderRadius.full,
        overflow: 'hidden',
        marginTop: spacing.base,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary.zomato_red,
        borderRadius: borderRadius.full,
    },
    completedCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.lg,
        padding: spacing.base,
        marginBottom: spacing.sm,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...shadows.sm,
    },
    completedLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    completedTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1C',
    },
    completedSub: {
        fontSize: 12,
        color: '#666',
    },
    completedReward: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2FB050',
    },
});
