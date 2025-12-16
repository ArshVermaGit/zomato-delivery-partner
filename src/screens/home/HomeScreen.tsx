import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import IncomingOrderModal from '../../components/orders/IncomingOrderModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSequence,
    withSpring,
    FadeInDown,
    SlideInDown
} from 'react-native-reanimated';
import {
    Zap, ZapOff, ChevronRight, AlertCircle, MapPin,
    MoreVertical, Navigation, ArrowRight, Star, TrendingUp,
    Clock, Target, DollarSign, Package, Award, HelpCircle,
    Bell, Shield, User
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';
import { RootState } from '../../store';

// Mock AnimatedNumber for simplicity if not available, or could implement with Reanimated
const AnimatedNumber = ({ value, style }: { value: number, style?: any }) => {
    return <Text style={style}>{value}</Text>;
};

const Avatar = ({ size, imageUri }: { size: number, imageUri?: string }) => {
    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors.secondary.gray_200,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {imageUri ? <Animated.Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} /> : <User size={size / 2} color={colors.secondary.gray_500} />}
        </View>
    );
};

export const DeliveryHomeScreen = () => {
    const navigation = useNavigation<any>();
    const { user } = useSelector((state: RootState) => state.auth) as { user: any };
    // Using local state for UI demo, in real app sync with Redux
    const [isOnline, setIsOnline] = useState(false);
    const [incomingOrder, setIncomingOrder] = useState<any>(null);

    const mockIncomingOrder = {
        id: 'ORD-1234',
        restaurantName: 'Burger King',
        restaurantAddress: 'G-12, Sector 18, Noida',
        customerName: 'Rahul Kumar',
        customerAddress: 'B-404, Ace City, Noida Ext',
        pickupLocation: { lat: 28.567, lng: 77.321 },
        dropLocation: { lat: 28.570, lng: 77.325 },
        amount: 145,
        estimatedTime: 25,
        itemsCount: 3,
        peakHourBonus: 20
    };

    const handleAcceptOrder = (order: any) => {
        setIncomingOrder(null);
        // In real app: dispatch(acceptOrder(order));
        navigation.navigate('OrderDetail', { orderId: order.id });
    };

    const handleRejectOrder = (order: any) => {
        setIncomingOrder(null);
    };

    // Mock data derived from user or store
    const partnerName = user?.name || 'Partner';
    const profileImage = user?.profileImage; // assuming added to auth state

    // Mock stats
    const todaysEarnings = 1250;
    const deliveryCount = 12;
    const onlineHours = 5.5;
    const avgPerDelivery = 104;

    const rating = 4.8;
    const acceptanceRate = 95;
    const onTimeRate = 98;
    const completionRate = 100;

    // Active Order Mock
    const activeOrder: any = null; // Set to object to test active state

    const scale = useSharedValue(1);

    const toggleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handleToggleOnline = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        scale.value = withSequence(
            withSpring(0.95),
            withSpring(1)
        );
        setIsOnline(!isOnline);
    };

    const getTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Morning';
        if (hour < 18) return 'Afternoon';
        return 'Evening';
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Good {getTimeOfDay()},</Text>
                        <Text style={styles.name}>{partnerName}</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                        <Avatar size={44} imageUri={profileImage} />
                        <View style={[styles.onlineIndicator, { backgroundColor: isOnline ? colors.semantic.success : colors.secondary.gray_400 }]} />
                    </TouchableOpacity>
                </View>

                {/* Online/Offline Toggle */}
                <Animated.View style={[styles.toggleCard, toggleStyle]}>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            { backgroundColor: isOnline ? colors.semantic.success : colors.secondary.gray_400 }
                        ]}
                        onPress={handleToggleOnline}
                        activeOpacity={0.9}
                    >
                        <View style={styles.toggleContent}>
                            <View style={styles.toggleLeft}>
                                <View style={[
                                    styles.toggleIcon,
                                    { backgroundColor: isOnline ? colors.secondary.white : 'rgba(255,255,255,0.3)' }
                                ]}>
                                    {isOnline ? (
                                        <Zap size={28} color={colors.semantic.success} fill={colors.semantic.success} />
                                    ) : (
                                        <ZapOff size={28} color={colors.secondary.white} />
                                    )}
                                </View>
                                <View>
                                    <Text style={styles.toggleStatus}>
                                        {isOnline ? "You're Online" : "You're Offline"}
                                    </Text>
                                    <Text style={styles.toggleSubtext}>
                                        {isOnline ? 'Ready to accept orders' : 'Tap to go online'}
                                    </Text>
                                </View>
                            </View>
                            <ChevronRight size={24} color={colors.secondary.white} />
                        </View>
                    </TouchableOpacity>

                    {/* Warning if offline */}
                    {!isOnline && (
                        <Animated.View
                            entering={FadeInDown}
                            style={styles.offlineWarning}
                        >
                            <AlertCircle size={16} color={colors.semantic.warning} />
                            <Text style={styles.offlineWarningText}>
                                You won't receive new orders while offline
                            </Text>
                        </Animated.View>
                    )}

                    {/* Demo Button for testing */}
                    <TouchableOpacity
                        style={{ marginVertical: 10, padding: 12, backgroundColor: '#333', borderRadius: 8, alignItems: 'center' }}
                        onPress={() => setIncomingOrder(mockIncomingOrder)}
                    >
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Simulate Incoming Order</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Today's Earnings */}
                <View style={styles.earningsCard}>
                    <View style={styles.earningsHeader}>
                        <Text style={styles.earningsLabel}>Today's Earnings</Text>
                        <TouchableOpacity style={styles.viewDetailsButton} onPress={() => navigation.navigate('Earnings')}>
                            <Text style={styles.viewDetailsText}>View Details</Text>
                            <ChevronRight size={16} color={colors.primary.zomato_red} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.earningsAmount}>
                        <Text style={styles.currencySymbol}>₹</Text>
                        <AnimatedNumber value={todaysEarnings} style={styles.earningsValue} />
                    </View>

                    <View style={styles.earningsStats}>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>{deliveryCount}</Text>
                            <Text style={styles.statLabel}>Deliveries</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>{onlineHours}</Text>
                            <Text style={styles.statLabel}>Hours Online</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>₹{avgPerDelivery}</Text>
                            <Text style={styles.statLabel}>Avg/Delivery</Text>
                        </View>
                    </View>
                </View>

                {/* Active Order (if any) */}
                {activeOrder && (
                    <Animated.View
                        entering={SlideInDown.springify()}
                        style={styles.activeOrderCard}
                    >
                        <View style={styles.activeOrderHeader}>
                            <View style={styles.activeOrderBadge}>
                                <Text style={styles.activeOrderBadgeText}>Active Order</Text>
                            </View>
                            <Text style={styles.activeOrderId}>#{activeOrder.id}</Text>
                        </View>

                        <View style={styles.activeOrderContent}>
                            <View style={styles.activeOrderLocation}>
                                <MapPin size={20} color={colors.primary.zomato_red} />
                                <View style={styles.activeOrderLocationText}>
                                    <Text style={styles.activeOrderRestaurant}>
                                        {activeOrder.restaurant}
                                    </Text>
                                    <Text style={styles.activeOrderAddress} numberOfLines={1}>
                                        {activeOrder.pickupAddress}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.activeOrderDivider}>
                                <View style={styles.dashedLine} />
                                <MoreVertical size={16} color={colors.secondary.gray_400} />
                            </View>

                            <View style={styles.activeOrderLocation}>
                                <Navigation size={20} color={colors.semantic.success} />
                                <View style={styles.activeOrderLocationText}>
                                    <Text style={styles.activeOrderCustomer}>
                                        {activeOrder.customerName}
                                    </Text>
                                    <Text style={styles.activeOrderAddress} numberOfLines={1}>
                                        {activeOrder.dropAddress}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.viewOrderButton}
                            onPress={() => navigation.navigate('OrderDetail', { orderId: activeOrder.id })}
                        >
                            <Text style={styles.viewOrderButtonText}>View Order Details</Text>
                            <ArrowRight size={20} color={colors.secondary.white} />
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {/* Performance Stats */}
                <View style={styles.performanceCard}>
                    <View style={styles.performanceHeader}>
                        <Text style={styles.performanceTitle}>Your Performance</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Performance')}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.performanceGrid}>
                        <PerformanceStat
                            icon={<Star size={24} color={colors.semantic.warning} fill={colors.semantic.warning} />}
                            value={rating}
                            label="Rating"
                            color={colors.semantic.warning}
                        />
                        <PerformanceStat
                            icon={<TrendingUp size={24} color={colors.semantic.success} />}
                            value={`${acceptanceRate}%`}
                            label="Acceptance"
                            color={colors.semantic.success}
                        />
                        <PerformanceStat
                            icon={<Clock size={24} color={colors.semantic.info} />}
                            value={`${onTimeRate}%`}
                            label="On Time"
                            color={colors.semantic.info}
                        />
                        <PerformanceStat
                            icon={<Target size={24} color={colors.primary.zomato_red} />}
                            value={completionRate}
                            label="Completion"
                            color={colors.primary.zomato_red}
                        />
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <QuickActionButton
                        icon={<DollarSign size={24} color={colors.semantic.success} />}
                        label="Earnings"
                        onPress={() => navigation.navigate('Earnings')}
                    />
                    <QuickActionButton
                        icon={<Package size={24} color={colors.primary.zomato_red} />}
                        label="Orders"
                        onPress={() => navigation.navigate('Orders')}
                    />
                    <QuickActionButton
                        icon={<Award size={24} color={colors.semantic.warning} />}
                        label="Incentives"
                        onPress={() => navigation.navigate('Incentives')}
                    />
                    <QuickActionButton
                        icon={<HelpCircle size={24} color={colors.semantic.info} />}
                        label="Support"
                        onPress={() => navigation.navigate('HelpSupport')}
                    />
                </View>

                {/* Spacer */}
                <View style={{ height: 80 }} />
            </ScrollView>
            <IncomingOrderModal
                visible={!!incomingOrder}
                order={incomingOrder}
                onAccept={handleAcceptOrder}
                onReject={handleRejectOrder}
            />
        </SafeAreaView>
    );
};

// Sub-components
const PerformanceStat = ({ icon, value, label, color }: any) => (
    <View style={styles.performanceStat}>
        <View style={[styles.performanceIconContainer, { backgroundColor: `${color}15` }]}>
            {icon}
        </View>
        <Text style={styles.performanceValue}>{value}</Text>
        <Text style={styles.performanceLabel}>{label}</Text>
    </View>
);

const QuickActionButton = ({ icon, label, onPress }: any) => (
    <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
        <View style={styles.quickActionIcon}>{icon}</View>
        <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary.gray_50,
    },
    content: {
        padding: spacing.base,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    greeting: {
        ...typography.body_medium,
        color: colors.secondary.gray_600,
    },
    name: {
        ...typography.h2,
        color: colors.secondary.gray_900,
        marginTop: 2,
    },
    profileButton: {
        position: 'relative',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: colors.secondary.white,
    },
    toggleCard: {
        marginBottom: spacing.base,
    },
    toggleButton: {
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        ...shadows.lg,
    },
    toggleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toggleLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    toggleIcon: {
        width: 56,
        height: 56,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleStatus: {
        ...typography.h3,
        color: colors.secondary.white,
        marginBottom: 2,
    },
    toggleSubtext: {
        ...typography.body_small,
        color: 'rgba(255,255,255,0.9)',
    },
    offlineWarning: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.semantic.warning_light,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
        marginTop: spacing.sm,
    },
    offlineWarningText: {
        ...typography.body_small,
        color: colors.semantic.warning,
        flex: 1,
    },
    earningsCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.card,
    },
    earningsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    earningsLabel: {
        ...typography.body_medium,
        color: colors.secondary.gray_600,
    },
    viewDetailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    viewDetailsText: {
        ...typography.label_small,
        color: colors.primary.zomato_red,
    },
    earningsAmount: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.base,
    },
    currencySymbol: {
        ...typography.h2,
        color: colors.secondary.gray_900,
        marginTop: 4,
    },
    earningsValue: {
        ...typography.display_large,
        color: colors.secondary.gray_900,
        fontWeight: '700',
    },
    earningsStats: {
        flexDirection: 'row',
        paddingTop: spacing.base,
        borderTopWidth: 1,
        borderTopColor: colors.secondary.gray_200,
    },
    stat: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        ...typography.h3,
        color: colors.secondary.gray_900,
        marginBottom: spacing.xs,
    },
    statLabel: {
        ...typography.caption,
        color: colors.secondary.gray_600,
    },
    statDivider: {
        width: 1,
        backgroundColor: colors.secondary.gray_200,
    },
    activeOrderCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.card,
        borderWidth: 1.5,
        borderColor: colors.primary.zomato_red,
    },
    activeOrderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.base,
    },
    activeOrderBadge: {
        backgroundColor: colors.primary.zomato_red,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
    },
    activeOrderBadgeText: {
        ...typography.label_small,
        color: colors.secondary.white,
        fontWeight: '700',
    },
    activeOrderId: {
        ...typography.body_medium,
        color: colors.secondary.gray_600,
        fontWeight: '600',
    },
    activeOrderContent: {
        marginBottom: spacing.base,
    },
    activeOrderLocation: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    activeOrderLocationText: {
        flex: 1,
    },
    activeOrderRestaurant: {
        ...typography.label_medium,
        color: colors.secondary.gray_900,
        marginBottom: 2,
    },
    activeOrderCustomer: {
        ...typography.label_medium,
        color: colors.secondary.gray_900,
        marginBottom: 2,
    },
    activeOrderAddress: {
        ...typography.body_small,
        color: colors.secondary.gray_600,
    },
    activeOrderDivider: {
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    dashedLine: {
        position: 'absolute',
        left: 10,
        top: 0,
        bottom: 0,
        width: 2,
        borderLeftWidth: 2,
        borderLeftColor: colors.secondary.gray_300,
        borderStyle: 'dashed',
    },
    viewOrderButton: {
        backgroundColor: colors.primary.zomato_red,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        gap: spacing.sm
    },
    viewOrderButtonText: {
        color: colors.secondary.white,
        fontWeight: '600',
        fontSize: 16
    },
    performanceCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.card,
    },
    performanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.base,
    },
    performanceTitle: {
        ...typography.h4,
        color: colors.secondary.gray_900,
    },
    viewAllText: {
        ...typography.label_small,
        color: colors.primary.zomato_red,
    },
    performanceGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    performanceStat: {
        flex: 1,
        minWidth: '45%',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.secondary.gray_50,
        borderRadius: borderRadius.lg,
    },
    performanceIconContainer: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    performanceValue: {
        ...typography.h3,
        color: colors.secondary.gray_900,
        marginBottom: spacing.xs,
    },
    performanceLabel: {
        ...typography.caption,
        color: colors.secondary.gray_600,
    },
    quickActions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    quickActionButton: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.lg,
        padding: spacing.base,
        alignItems: 'center',
        ...shadows.sm,
    },
    quickActionIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.secondary.gray_50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    quickActionLabel: {
        ...typography.label_small,
        color: colors.secondary.gray_900,
    },
});

export default DeliveryHomeScreen;
