import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LineChart } from 'react-native-chart-kit';
import {
    DollarSign,
    TrendingUp,
    Download,
    ChevronRight,
    Award,
    Clock,
    Package
} from 'lucide-react-native';
import { colors, typography, shadows } from '@zomato/design-tokens';
import { Button } from '@zomato/ui';
import { useNavigation } from '@react-navigation/native';
import { useCreateAdHocPaymentMutation, useVerifyPaymentMutation } from '../../services/api/paymentsApi';
import RazorpayCheckout from 'react-native-razorpay';

// Local theme constants to ensure availability
const spacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 24, xl: 32 };
const borderRadius = { sm: 4, md: 8, lg: 12, xl: 16, full: 999 };

const SCREEN_WIDTH = Dimensions.get('window').width;

export const EarningsScreen = () => {
    const navigation = useNavigation<any>();
    const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');
    const [showBreakdown, setShowBreakdown] = useState(false);

    // Mock data
    const earningsData = {
        today: { amount: 1250, deliveries: 8, hours: 6.5 },
        week: { amount: 8750, deliveries: 52, hours: 42 },
        month: { amount: 34500, deliveries: 220, hours: 168 },
    };

    const currentEarnings = earningsData[selectedPeriod];

    const chartData = {
        labels: selectedPeriod === 'today'
            ? ['9AM', '12PM', '3PM', '6PM', '9PM']
            : selectedPeriod === 'week'
                ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                : ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            data: selectedPeriod === 'today'
                ? [120, 280, 350, 420, 80]
                : selectedPeriod === 'week'
                    ? [1150, 1320, 1280, 1450, 1380, 980, 1190]
                    : [7800, 8400, 9200, 9100],
        }],
    };

    const breakdownData = [
        { label: 'Base Delivery Fee', amount: 6200, percentage: 72, color: colors.primary.zomato_red },
        { label: 'Distance Bonus', amount: 1400, percentage: 16, color: '#2FB050' }, // Success green
        { label: 'Peak Hour Bonus', amount: 680, percentage: 8, color: '#FBC02D' }, // Warning yellow
        { label: 'Tips', amount: 470, percentage: 4, color: '#2196F3' }, // Info blue
    ];

    const recentTransactions = [
        { id: '1', orderId: 'ZOM12345', amount: 145, time: '2:30 PM', type: 'delivery', label: '' },
        { id: '2', orderId: 'ZOM12344', amount: 168, time: '1:45 PM', type: 'delivery', label: '' },
        { id: '3', orderId: 'ZOM12343', amount: 132, time: '12:20 PM', type: 'delivery', label: '' },
        { id: '4', type: 'bonus', amount: 200, time: '11:00 AM', label: 'Peak Hour Bonus', orderId: '' },
        { id: '5', orderId: 'ZOM12342', amount: 156, time: '10:30 AM', type: 'delivery', label: '' },
    ];
    const [initiateAdHoc, { isLoading: isPaying }] = useCreateAdHocPaymentMutation();
    const [verifyPayment] = useVerifyPaymentMutation();

    const handleDeposit = async () => {
        try {
            const amount = 500; // Fixed amount for MVP
            const { data: paymentData } = await initiateAdHoc({ amount, purpose: 'CASH_DEPOSIT' }).unwrap();

            const options = {
                description: 'Deposit Cash Collection',
                image: 'https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png',
                currency: paymentData.currency,
                key: paymentData.key,
                amount: paymentData.amount,
                name: 'Zomato Delivery',
                order_id: paymentData.id,
                theme: { color: colors.primary.zomato_red }
            };

            RazorpayCheckout.open(options).then(async (data: any) => {
                await verifyPayment({
                    paymentId: data.razorpay_payment_id,
                    razorpayOrderId: data.razorpay_order_id,
                    signature: data.razorpay_signature
                }).unwrap();
                Alert.alert('Success', 'Deposit Successful!');
            }).catch((err: any) => {
                console.error(err);
                Alert.alert('Error', 'Payment Failed');
            });
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to initiate deposit');
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Earnings</Text>
                <TouchableOpacity style={styles.downloadButton}>
                    <Download size={20} color={colors.primary.zomato_red} />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Period Selector */}
                <View style={styles.periodSelector}>
                    <PeriodButton
                        active={selectedPeriod === 'today'}
                        onPress={() => setSelectedPeriod('today')}
                    >
                        Today
                    </PeriodButton>
                    <PeriodButton
                        active={selectedPeriod === 'week'}
                        onPress={() => setSelectedPeriod('week')}
                    >
                        This Week
                    </PeriodButton>
                    <PeriodButton
                        active={selectedPeriod === 'month'}
                        onPress={() => setSelectedPeriod('month')}
                    >
                        This Month
                    </PeriodButton>
                </View>

                {/* Total Earnings Card */}
                <Animated.View
                    entering={FadeInDown.delay(100)}
                    style={styles.totalEarningsCard}
                >
                    <View style={styles.earningsIconContainer}>
                        <View style={styles.earningsIcon}>
                            <DollarSign size={28} color={'#2FB050'} />
                        </View>
                        <View style={styles.trendBadge}>
                            <TrendingUp size={12} color={'#2FB050'} />
                            <Text style={styles.trendText}>+12%</Text>
                        </View>
                    </View>

                    <Text style={styles.earningsLabel}>Total Earnings</Text>
                    <View style={styles.earningsAmountRow}>
                        <Text style={styles.currencySymbol}>₹</Text>
                        <Text style={styles.earningsAmount}>{currentEarnings.amount.toLocaleString('en-IN')}</Text>
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <StatItem
                            icon={<Package size={16} color={colors.secondary.gray_500} />}
                            label="Deliveries"
                            value={currentEarnings.deliveries}
                        />
                        <View style={styles.statDivider} />
                        <StatItem
                            icon={<Clock size={16} color={colors.secondary.gray_500} />}
                            label="Hours"
                            value={`${currentEarnings.hours}h`}
                        />
                        <View style={styles.statDivider} />
                        <StatItem
                            icon={<DollarSign size={16} color={colors.secondary.gray_500} />}
                            label="Per Hour"
                            value={`₹${Math.round(currentEarnings.amount / currentEarnings.hours)}`}
                        />
                    </View>
                </Animated.View>

                {/* Chart */}
                <Animated.View
                    entering={FadeInDown.delay(200)}
                    style={styles.chartCard}
                >
                    <View style={styles.chartHeader}>
                        <Text style={styles.chartTitle}>Earnings Trend</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewDetailsLink}>Details</Text>
                        </TouchableOpacity>
                    </View>

                    <LineChart
                        data={chartData}
                        width={SCREEN_WIDTH - 48}
                        height={200}
                        chartConfig={{
                            backgroundColor: colors.secondary.white,
                            backgroundGradientFrom: colors.secondary.white,
                            backgroundGradientTo: colors.secondary.white,
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(226, 55, 68, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(60, 60, 67, ${opacity})`,
                            style: {
                                borderRadius: borderRadius.xl,
                            },
                            propsForDots: {
                                r: '5',
                                strokeWidth: '2',
                                stroke: colors.primary.zomato_red,
                            },
                            propsForBackgroundLines: {
                                strokeDasharray: '',
                                stroke: '#F0F0F0',
                                strokeWidth: 1,
                            },
                        }}
                        bezier
                        style={styles.chart}
                        withInnerLines
                        withOuterLines
                        withVerticalLines={false}
                        withHorizontalLines
                        fromZero
                    />
                </Animated.View>

                {/* Earnings Breakdown */}
                <Animated.View
                    entering={FadeInDown.delay(300)}
                    style={styles.breakdownCard}
                >
                    <TouchableOpacity
                        style={styles.breakdownHeader}
                        onPress={() => setShowBreakdown(!showBreakdown)}
                    >
                        <Text style={styles.breakdownTitle}>Earnings Breakdown</Text>
                        <ChevronRight
                            size={20}
                            color={colors.secondary.gray_500}
                            style={{
                                transform: [{ rotate: showBreakdown ? '90deg' : '0deg' }]
                            }}
                        />
                    </TouchableOpacity>

                    {showBreakdown && (
                        <Animated.View entering={FadeInDown}>
                            {breakdownData.map((item, index) => (
                                <View key={index} style={styles.breakdownItem}>
                                    <View style={styles.breakdownLeft}>
                                        <View style={[styles.breakdownDot, { backgroundColor: item.color }]} />
                                        <Text style={styles.breakdownLabel}>{item.label}</Text>
                                    </View>
                                    <View style={styles.breakdownRight}>
                                        <Text style={styles.breakdownAmount}>₹{item.amount}</Text>
                                        <Text style={styles.breakdownPercentage}>{item.percentage}%</Text>
                                    </View>
                                </View>
                            ))}

                            {/* Progress Bars */}
                            <View style={styles.progressBars}>
                                {breakdownData.map((item, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.progressBar,
                                            {
                                                flex: item.percentage / 100,
                                                backgroundColor: item.color,
                                                borderTopLeftRadius: index === 0 ? borderRadius.full : 0,
                                                borderBottomLeftRadius: index === 0 ? borderRadius.full : 0,
                                                borderTopRightRadius: index === breakdownData.length - 1 ? borderRadius.full : 0,
                                                borderBottomRightRadius: index === breakdownData.length - 1 ? borderRadius.full : 0,
                                            }
                                        ]}
                                    />
                                ))}
                            </View>
                        </Animated.View>
                    )}
                </Animated.View>

                {/* Recent Transactions */}
                <Animated.View
                    entering={FadeInDown.delay(400)}
                    style={styles.transactionsCard}
                >
                    <View style={styles.transactionsHeader}>
                        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllLink}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    {recentTransactions.map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </Animated.View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <QuickActionCard
                        icon={<Download size={24} color={'#2196F3'} />}
                        title="Download Statement"
                        subtitle="Get detailed earnings report"
                        color={'#2196F3'}
                        onPress={() => { }}
                    />
                    <QuickActionCard
                        icon={<Award size={24} color={'#FBC02D'} />}
                        title="View Incentives"
                        subtitle="Check active bonuses"
                        color={'#FBC02D'}
                        onPress={() => navigation.navigate('Incentives')}
                    />
                </View>

                {/* Spacer */}
                <View style={{ height: 80 }} />
            </ScrollView>

            {/* Request Payout Button - Using Zomato UI Button */}
            <View style={styles.bottomAction}>
                <Button
                    onPress={() => navigation.navigate('PayoutScreen')}
                    variant="primary"
                    size="large"
                    fullWidth
                    rightIcon={<ChevronRight size={20} color={colors.secondary.white} />}
                >
                    {`Request Payout • ₹${currentEarnings.amount.toLocaleString('en-IN')}`}
                </Button>
                <View style={{ height: 12 }} />
                <Button
                    onPress={handleDeposit}
                    variant="outline"
                    size="large"
                    loading={isPaying}
                    fullWidth
                >
                    Deposit Floating Cash (₹500)
                </Button>
            </View>
        </SafeAreaView>
    );
};

// Sub-components
const PeriodButton = ({ active, onPress, children }: { active: boolean, onPress: () => void, children: React.ReactNode }) => (
    <TouchableOpacity
        style={[styles.periodButton, active && styles.periodButtonActive]}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <Text style={[styles.periodButtonText, active && styles.periodButtonTextActive]}>
            {children}
        </Text>
    </TouchableOpacity>
);

const StatItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
    <View style={styles.statItem}>
        {icon}
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const TransactionItem = ({ transaction }: { transaction: any }) => (
    <View style={styles.transactionItem}>
        <View style={styles.transactionLeft}>
            <View style={[
                styles.transactionIcon,
                { backgroundColor: transaction.type === 'bonus' ? '#FFF9C4' : '#F5F5F5' }
            ]}>
                {transaction.type === 'bonus' ? (
                    <Award size={20} color={'#FBC02D'} />
                ) : (
                    <Package size={20} color={colors.secondary.gray_500} />
                )}
            </View>
            <View style={styles.transactionInfo}>
                <Text style={styles.transactionLabel}>
                    {transaction.type === 'bonus' ? transaction.label : `Order #${transaction.orderId}`}
                </Text>
                <Text style={styles.transactionTime}>{transaction.time}</Text>
            </View>
        </View>
        <Text style={styles.transactionAmount}>+₹{transaction.amount}</Text>
    </View>
);

const QuickActionCard = ({ icon, title, subtitle, color, onPress }: { icon: React.ReactNode, title: string, subtitle: string, color: string, onPress: () => void }) => (
    <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
        <View style={[styles.quickActionIcon, { backgroundColor: `${color}15` }]}>
            {icon}
        </View>
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        backgroundColor: colors.secondary.white,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        ...typography.h2,
        color: '#1C1C1C',
        fontSize: 20,
    },
    downloadButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        padding: spacing.base,
    },
    periodSelector: {
        flexDirection: 'row',
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: 4,
        marginBottom: spacing.base,
        ...shadows.sm,
    },
    periodButton: {
        flex: 1,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.lg,
    },
    periodButtonActive: {
        backgroundColor: colors.primary.zomato_red,
    },
    periodButtonText: {
        ...typography.caption,
        fontSize: 14,
        color: '#666',
    },
    periodButtonTextActive: {
        color: colors.secondary.white,
        fontWeight: '600',
    },
    totalEarningsCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.lg,
    },
    earningsIconContainer: {
        position: 'relative',
        alignSelf: 'flex-start',
        marginBottom: spacing.md,
    },
    earningsIcon: {
        width: 64,
        height: 64,
        borderRadius: borderRadius.xl,
        backgroundColor: '#E8F5E9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    trendBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary.white,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.full,
        gap: 2,
        ...shadows.sm,
    },
    trendText: {
        ...typography.caption,
        color: '#2FB050',
        fontWeight: '700',
        fontSize: 10,
    },
    earningsLabel: {
        fontSize: 14, // Replaces typography.body
        fontWeight: '400',
        color: '#666',
        marginBottom: 4,
    },
    earningsAmountRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.base,
    },
    currencySymbol: {
        ...typography.h2,
        color: '#1C1C1C',
        marginTop: 6,
        marginRight: 4,
    },
    earningsAmount: {
        fontSize: 42,
        color: '#1C1C1C',
        fontWeight: '700',
        lineHeight: 48,
    },
    statsRow: {
        flexDirection: 'row',
        paddingTop: spacing.base,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
    },
    statValue: {
        fontSize: 16,
        color: '#1C1C1C',
        fontWeight: '600',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#F0F0F0',
    },
    chartCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.lg,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.base,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1C',
    },
    viewDetailsLink: {
        fontSize: 12,
        color: colors.primary.zomato_red,
        fontWeight: '600',
    },
    chart: {
        marginVertical: spacing.sm,
        borderRadius: borderRadius.lg,
    },
    breakdownCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.lg,
    },
    breakdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    breakdownTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1C',
    },
    breakdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    breakdownLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    breakdownDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    breakdownLabel: {
        fontSize: 14,
        color: '#444',
    },
    breakdownRight: {
        alignItems: 'flex-end',
    },
    breakdownAmount: {
        fontSize: 14,
        color: '#1C1C1C',
        fontWeight: '600',
    },
    breakdownPercentage: {
        fontSize: 10,
        color: '#888',
    },
    progressBars: {
        flexDirection: 'row',
        height: 8,
        marginTop: spacing.base,
        overflow: 'hidden',
        borderRadius: borderRadius.full,
    },
    progressBar: {
        height: '100%',
    },
    transactionsCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.lg,
    },
    transactionsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    transactionsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1C',
    },
    viewAllLink: {
        fontSize: 12,
        color: colors.primary.zomato_red,
        fontWeight: '600',
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        flex: 1,
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    transactionInfo: {
        flex: 1,
    },
    transactionLabel: {
        fontSize: 14,
        color: '#1C1C1C',
        marginBottom: 2,
    },
    transactionTime: {
        fontSize: 12,
        color: '#888',
    },
    transactionAmount: {
        fontSize: 14,
        color: '#2FB050',
        fontWeight: '600',
    },
    quickActions: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.base,
    },
    quickActionCard: {
        flex: 1,
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        alignItems: 'center',
        ...shadows.sm,
    },
    quickActionIcon: {
        width: 56,
        height: 56,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    quickActionTitle: {
        fontSize: 12,
        color: '#1C1C1C',
        textAlign: 'center',
        marginBottom: 4,
        fontWeight: '600',
    },
    quickActionSubtitle: {
        fontSize: 10,
        color: '#888',
        textAlign: 'center',
    },
    bottomAction: {
        padding: spacing.base,
        backgroundColor: colors.secondary.white,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        ...shadows.lg,
    },
});

export default EarningsScreen;
