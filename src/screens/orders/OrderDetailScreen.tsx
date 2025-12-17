import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
    ChevronLeft, MoreVertical, MapPin, Clock, Navigation, CheckCircle,
    Phone, MessageSquare, FileText, Package, ChevronDown, Banknote,
    CreditCard, DollarSign
} from 'lucide-react-native';
import { Button } from '@zomato/ui';
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { updateOrderStatusThunk } from '../../store/slices/deliverySlice';

export const OrderDetailScreen = () => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch<AppDispatch>();
    const route = useRoute<any>();
    const { orderId } = route.params || { orderId: 'ORD-MOCK' };

    const [currentStatus, setCurrentStatus] = useState<'going_to_restaurant' | 'at_restaurant' | 'going_to_customer' | 'at_customer' | 'delivered'>('going_to_restaurant');
    const [showItems, setShowItems] = useState(true);

    // Status flow: going_to_restaurant -> at_restaurant -> going_to_customer -> at_customer -> delivered
    const statusConfig = {
        going_to_restaurant: {
            title: 'Going to Restaurant',
            subtitle: 'Navigate to pickup location',
            primaryAction: 'Navigate',
            secondaryAction: 'Mark as Arrived',
            color: colors.primary.zomato_red,
        },
        at_restaurant: {
            title: 'At Restaurant',
            subtitle: 'Waiting for order to be ready',
            primaryAction: 'Call Restaurant',
            secondaryAction: 'Mark as Picked Up',
            color: colors.semantic.warning,
        },
        going_to_customer: {
            title: 'Going to Customer',
            subtitle: 'Deliver the order',
            primaryAction: 'Navigate',
            secondaryAction: 'Mark as Arrived',
            color: colors.semantic.info,
        },
        at_customer: {
            title: 'At Customer Location',
            subtitle: 'Complete the delivery',
            primaryAction: 'Call Customer',
            secondaryAction: 'Mark as Delivered',
            color: colors.semantic.success,
        },
        delivered: {
            title: 'Delivered',
            subtitle: 'Order completed',
            primaryAction: 'Done',
            secondaryAction: '',
            color: colors.semantic.success
        }
    };

    const config = statusConfig[currentStatus];

    const { activeOrder, orderHistory } = useSelector((state: RootState) => state.delivery);

    // Find order from active or history based on ID
    // If not found in locally cached lists, one might need to fetch it (omitted for MVP, assume passed or in list)
    const orderData = activeOrder && activeOrder.id === orderId ? activeOrder : orderHistory.find(o => o.id === orderId);

    useEffect(() => {
        if (orderData) {
            // Map backend status to UI status
            // Status flow: 'ACCEPTED' -> 'ARRIVED_RESTAURANT' -> 'PICKED_UP' -> 'ARRIVED_CUSTOMER' -> 'DELIVERED' -> 'OUT_FOR_DELIVERY' mapping
            let uiStatus: any = 'going_to_restaurant';
            if (orderData.status === 'ARRIVED_RESTAURANT') uiStatus = 'at_restaurant';
            if (orderData.status === 'PICKED_UP' || orderData.status === 'OUT_FOR_DELIVERY') uiStatus = 'going_to_customer';
            if (orderData.status === 'ARRIVED_CUSTOMER') uiStatus = 'at_customer';
            if (orderData.status === 'DELIVERED') uiStatus = 'delivered';

            setCurrentStatus(uiStatus);
        }
    }, [orderData, orderId]);

    const handleNavigate = () => {
        Alert.alert('Navigation', `Starting navigation to ${currentStatus.includes('restaurant') ? 'Restaurant' : 'Customer'}...`);
        // Mock arrival for demo
        setTimeout(() => {
            if (currentStatus === 'going_to_restaurant') setCurrentStatus('at_restaurant');
            if (currentStatus === 'going_to_customer') setCurrentStatus('at_customer');
        }, 2000);
    };

    const handleNavigateToRestaurant = () => {
        handleNavigate();
    };

    const handleNavigateToCustomer = () => {
        handleNavigate();
    };

    const handleMarkPickedUp = () => {
        if (!orderData) return;
        dispatch(updateOrderStatusThunk({ orderId: orderData.id, status: 'PICKED_UP' }))
            .unwrap()
            .then(() => {
                Alert.alert('Status Updated', 'Order picked up successfully');
                setCurrentStatus('going_to_customer');
            })
            .catch(() => {
                Alert.alert('Error', 'Failed to update status');
            });
    };

    const handleMarkDelivered = () => {
        if (!orderData) return;
        dispatch(updateOrderStatusThunk({ orderId: orderData.id, status: 'DELIVERED' }))
            .unwrap()
            .then(() => {
                Alert.alert('Success', 'Order Delivered Successfully!', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            })
            .catch(() => {
                Alert.alert('Error', 'Failed to update status');
            });
    };

    if (!orderData) return null;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <ChevronLeft size={24} color={colors.secondary.gray_900} />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Order #{orderData?.displayId}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: `${config.color}20` }]}>
                        <View style={[styles.statusDot, { backgroundColor: config.color }]} />
                        <Text style={[styles.statusText, { color: config.color }]}>
                            {config.title}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                    <MoreVertical size={24} color={colors.secondary.gray_900} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Status Card */}
                <Animated.View
                    entering={FadeInDown.duration(400)}
                    style={[styles.statusCard, { borderColor: config.color }]}
                >
                    <View style={styles.statusCardHeader}>
                        <View style={[styles.statusIcon, { backgroundColor: config.color }]}>
                            {currentStatus === 'going_to_restaurant' && <MapPin size={24} color={colors.secondary.white} />}
                            {currentStatus === 'at_restaurant' && <Clock size={24} color={colors.secondary.white} />}
                            {currentStatus === 'going_to_customer' && <Navigation size={24} color={colors.secondary.white} />}
                            {currentStatus === 'at_customer' && <CheckCircle size={24} color={colors.secondary.white} />}
                            {currentStatus === 'delivered' && <CheckCircle size={24} color={colors.secondary.white} />}
                        </View>
                        <View style={styles.statusCardText}>
                            <Text style={styles.statusCardTitle}>{config.title}</Text>
                            <Text style={styles.statusCardSubtitle}>{config.subtitle}</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Pickup Location (if going to or at restaurant) */}
                {(currentStatus === 'going_to_restaurant' || currentStatus === 'at_restaurant') && (
                    <Animated.View entering={FadeInDown.delay(100)} style={styles.locationCard}>
                        <View style={styles.locationHeader}>
                            <View style={styles.locationIconContainer}>
                                <MapPin size={20} color={colors.primary.zomato_red} />
                            </View>
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationLabel}>Pickup from</Text>
                                <Text style={styles.locationName}>{orderData?.restaurantName}</Text>
                                <Text style={styles.locationAddress} numberOfLines={2}>
                                    {orderData?.pickupAddress}
                                </Text>
                                <View style={styles.locationMeta}>
                                    <View style={styles.metaItem}>
                                        <Navigation size={14} color={colors.secondary.gray_600} />
                                        <Text style={styles.metaText}>{orderData?.distanceToPickup} km away</Text>
                                    </View>
                                    <View style={styles.metaItem}>
                                        <Clock size={14} color={colors.secondary.gray_600} />
                                        <Text style={styles.metaText}>{orderData?.etaToPickup} mins</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.locationActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Phone size={20} color={colors.primary.zomato_red} />
                                <Text style={styles.actionButtonText}>Call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <MessageSquare size={20} color={colors.primary.zomato_red} />
                                <Text style={styles.actionButtonText}>Chat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.actionButtonPrimary]}
                                onPress={handleNavigateToRestaurant}
                            >
                                <Navigation size={20} color={colors.secondary.white} />
                                <Text style={[styles.actionButtonText, { color: colors.secondary.white }]}>
                                    Navigate
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* OTP (if at restaurant) */}
                        {currentStatus === 'at_restaurant' && (
                            <View style={styles.otpContainer}>
                                <Text style={styles.otpLabel}>Pickup OTP</Text>
                                <View style={styles.otpBox}>
                                    <Text style={styles.otpCode}>{orderData?.pickupOTP}</Text>
                                </View>
                                <Text style={styles.otpHint}>Show this to restaurant staff</Text>
                            </View>
                        )}
                    </Animated.View>
                )}

                {/* Delivery Location (if going to or at customer) */}
                {(currentStatus === 'going_to_customer' || currentStatus === 'at_customer') && (
                    <Animated.View entering={FadeInDown.delay(100)} style={styles.locationCard}>
                        <View style={styles.locationHeader}>
                            <View style={[styles.locationIconContainer, { backgroundColor: colors.semantic.success_light }]}>
                                <Navigation size={20} color={colors.semantic.success} />
                            </View>
                            <View style={styles.locationInfo}>
                                <Text style={styles.locationLabel}>Deliver to</Text>
                                <Text style={styles.locationName}>{orderData?.customerName}</Text>
                                <Text style={styles.locationAddress} numberOfLines={2}>
                                    {orderData?.dropAddress}
                                </Text>
                                <View style={styles.locationMeta}>
                                    <View style={styles.metaItem}>
                                        <Navigation size={14} color={colors.secondary.gray_600} />
                                        <Text style={styles.metaText}>{orderData?.distanceToDrop} km away</Text>
                                    </View>
                                    <View style={styles.metaItem}>
                                        <Clock size={14} color={colors.secondary.gray_600} />
                                        <Text style={styles.metaText}>{orderData?.etaToDrop} mins</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.locationActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Phone size={20} color={colors.semantic.success} />
                                <Text style={styles.actionButtonText}>Call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <MessageSquare size={20} color={colors.semantic.success} />
                                <Text style={styles.actionButtonText}>Chat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.actionButtonPrimary, { backgroundColor: colors.semantic.success }]}
                                onPress={handleNavigateToCustomer}
                            >
                                <Navigation size={20} color={colors.secondary.white} />
                                <Text style={[styles.actionButtonText, { color: colors.secondary.white }]}>
                                    Navigate
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Instructions */}
                        {orderData?.deliveryInstructions && (
                            <View style={styles.instructionsContainer}>
                                <View style={styles.instructionsHeader}>
                                    <FileText size={16} color={colors.secondary.gray_600} />
                                    <Text style={styles.instructionsLabel}>Delivery Instructions</Text>
                                </View>
                                <Text style={styles.instructionsText}>
                                    {orderData.deliveryInstructions}
                                </Text>
                            </View>
                        )}

                        {/* OTP (if at customer) */}
                        {currentStatus === 'at_customer' && (
                            <View style={styles.otpContainer}>
                                <Text style={styles.otpLabel}>Delivery OTP</Text>
                                <View style={styles.otpBox}>
                                    <Text style={styles.otpCode}>{orderData?.deliveryOTP}</Text>
                                </View>
                                <Text style={styles.otpHint}>Ask customer for this OTP</Text>
                            </View>
                        )}
                    </Animated.View>
                )}

                {/* Order Items */}
                <View style={styles.itemsCard}>
                    <TouchableOpacity
                        style={styles.itemsHeader}
                        onPress={() => setShowItems(!showItems)}
                    >
                        <View style={styles.itemsHeaderLeft}>
                            <Package size={20} color={colors.secondary.gray_900} />
                            <Text style={styles.itemsTitle}>Order Items ({orderData?.items?.length})</Text>
                        </View>
                        <ChevronDown
                            size={20}
                            color={colors.secondary.gray_600}
                            style={{ transform: [{ rotate: showItems ? '180deg' : '0deg' }] }}
                        />
                    </TouchableOpacity>

                    {showItems && (
                        <Animated.View entering={FadeInDown}>
                            {orderData?.items?.map((item: any, index: number) => (
                                <View key={index} style={styles.orderItem}>
                                    <View style={styles.itemQuantity}>
                                        <Text style={styles.itemQuantityText}>{item.quantity}x</Text>
                                    </View>
                                    <View style={styles.itemDetails}>
                                        <View style={styles.itemNameRow}>
                                            {item.isVeg ? (
                                                <View style={[styles.foodIndicator, { borderColor: colors.semantic.success }]}>
                                                    <View style={[styles.foodDot, { backgroundColor: colors.semantic.success }]} />
                                                </View>
                                            ) : (
                                                <View style={[styles.foodIndicator, { borderColor: colors.primary.zomato_red }]}>
                                                    <View style={[styles.foodDot, { backgroundColor: colors.primary.zomato_red }]} />
                                                </View>
                                            )}
                                            <Text style={styles.itemName}>{item.name}</Text>
                                        </View>
                                        {item.customizations && (
                                            <Text style={styles.itemCustomizations}>
                                                {item.customizations}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            ))}
                        </Animated.View>
                    )}
                </View>

                {/* Order Summary */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Order Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Item Total</Text>
                        <Text style={styles.summaryValue}>₹{orderData?.itemsTotal}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Delivery Fee</Text>
                        <Text style={styles.summaryValue}>₹{orderData?.deliveryFee}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Taxes</Text>
                        <Text style={styles.summaryValue}>₹{orderData?.taxes}</Text>
                    </View>
                    {(orderData?.discount || 0) > 0 && (
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Discount</Text>
                            <Text style={[styles.summaryValue, { color: colors.semantic.success }]}>
                                -₹{orderData?.discount}
                            </Text>
                        </View>
                    )}
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabelTotal}>Total Amount</Text>
                        <Text style={styles.summaryValueTotal}>₹{orderData?.totalAmount}</Text>
                    </View>
                    <View style={styles.paymentMethod}>
                        <Text style={styles.paymentLabel}>Payment Method</Text>
                        <View style={styles.paymentBadge}>
                            {orderData?.paymentMethod === 'cash' ? (
                                <Banknote size={16} color={colors.semantic.success} />
                            ) : (
                                <CreditCard size={16} color={colors.semantic.info} />
                            )}
                            <Text style={styles.paymentText}>
                                {orderData?.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Paid Online'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Earnings */}
                <View style={styles.earningsCard}>
                    <View style={styles.earningsHeader}>
                        <DollarSign size={20} color={colors.semantic.success} />
                        <Text style={styles.earningsTitle}>Your Earnings</Text>
                    </View>
                    <View style={styles.earningsBreakdown}>
                        <View style={styles.earningsRow}>
                            <Text style={styles.earningsLabel}>Base Fee</Text>
                            <Text style={styles.earningsValue}>₹{orderData?.earnings?.baseFee}</Text>
                        </View>
                        {(orderData?.earnings?.distanceBonus || 0) > 0 && (
                            <View style={styles.earningsRow}>
                                <Text style={styles.earningsLabel}>Distance Bonus</Text>
                                <Text style={styles.earningsValue}>₹{orderData?.earnings?.distanceBonus}</Text>
                            </View>
                        )}
                        {(orderData?.earnings?.peakHourBonus || 0) > 0 && (
                            <View style={styles.earningsRow}>
                                <Text style={styles.earningsLabel}>Peak Hour Bonus</Text>
                                <Text style={styles.earningsValue}>₹{orderData?.earnings?.peakHourBonus}</Text>
                            </View>
                        )}
                        {(orderData?.tip || 0) > 0 && (
                            <View style={styles.earningsRow}>
                                <Text style={styles.earningsLabel}>Customer Tip</Text>
                                <Text style={[styles.earningsValue, { color: colors.semantic.success }]}>
                                    ₹{orderData?.tip}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.earningsDivider} />
                    <View style={styles.earningsTotal}>
                        <Text style={styles.earningsTotalLabel}>Total Earnings</Text>
                        <Text style={styles.earningsTotalValue}>₹{orderData?.earnings?.total}</Text>
                    </View>
                </View>

                {/* Spacer */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Action */}
            <View style={styles.bottomAction}>
                {currentStatus === 'at_restaurant' && (
                    <Button
                        variant="primary"
                        size="large"
                        fullWidth
                        onPress={handleMarkPickedUp}
                    >
                        Mark as Picked Up
                    </Button>
                )}
                {currentStatus === 'at_customer' && (
                    <Button
                        variant="primary"
                        size="large"
                        fullWidth
                        onPress={handleMarkDelivered}
                    >
                        Mark as Delivered
                    </Button>
                )}
                {(currentStatus === 'going_to_restaurant' || currentStatus === 'going_to_customer') && (
                    <Button
                        variant="primary"
                        size="large"
                        fullWidth
                        leftIcon={<Navigation size={20} color={colors.secondary.white} />}
                        onPress={handleNavigate}
                    >
                        {config.primaryAction}
                    </Button>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary.gray_50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        backgroundColor: colors.secondary.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary.gray_200,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        ...typography.label_medium,
        color: colors.secondary.gray_900,
        marginBottom: spacing.xs,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        gap: spacing.xs,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    statusText: {
        ...typography.caption,
        fontWeight: '600',
    },
    moreButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.base,
    },
    statusCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        borderWidth: 2,
        marginBottom: spacing.base,
        ...shadows.sm,
    },
    statusCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    statusIcon: {
        width: 56,
        height: 56,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusCardText: {
        flex: 1,
    },
    statusCardTitle: {
        ...typography.h3,
        color: colors.secondary.gray_900,
        marginBottom: spacing.xs,
    },
    statusCardSubtitle: {
        ...typography.body_medium,
        color: colors.secondary.gray_600,
    },
    locationCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.card,
    },
    locationHeader: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.base,
    },
    locationIconContainer: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.primary.zomato_red_tint,
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationInfo: {
        flex: 1,
    },
    locationLabel: {
        ...typography.caption,
        color: colors.secondary.gray_600,
        marginBottom: 2,
    },
    locationName: {
        ...typography.label_large,
        color: colors.secondary.gray_900,
        marginBottom: spacing.xs,
    },
    locationAddress: {
        ...typography.body_small,
        color: colors.secondary.gray_600,
        lineHeight: 18,
        marginBottom: spacing.sm,
    },
    locationMeta: {
        flexDirection: 'row',
        gap: spacing.base,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        ...typography.caption,
        color: colors.secondary.gray_600,
    },
    locationActions: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        backgroundColor: colors.secondary.gray_50,
        borderRadius: borderRadius.lg,
        gap: spacing.xs,
    },
    actionButtonPrimary: {
        backgroundColor: colors.primary.zomato_red,
    },
    actionButtonText: {
        ...typography.label_medium,
        color: colors.primary.zomato_red,
    },
    otpContainer: {
        alignItems: 'center',
        marginTop: spacing.base,
        paddingTop: spacing.base,
        borderTopWidth: 1,
        borderTopColor: colors.secondary.gray_200,
    },
    otpLabel: {
        ...typography.body_small,
        color: colors.secondary.gray_600,
        marginBottom: spacing.sm,
    },
    otpBox: {
        backgroundColor: colors.secondary.gray_100,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1.5,
        borderColor: colors.secondary.gray_300,
        borderStyle: 'dashed',
    },
    otpCode: {
        ...typography.display_medium,
        color: colors.secondary.gray_900,
        fontWeight: '700',
        letterSpacing: 8,
    },
    otpHint: {
        ...typography.caption,
        color: colors.secondary.gray_500,
        marginTop: spacing.sm,
    },
    instructionsContainer: {
        marginTop: spacing.base,
        paddingTop: spacing.base,
        borderTopWidth: 1,
        borderTopColor: colors.secondary.gray_200,
    },
    instructionsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.sm,
    },
    instructionsLabel: {
        ...typography.label_small,
        color: colors.secondary.gray_600,
    },
    instructionsText: {
        ...typography.body_medium,
        color: colors.secondary.gray_900,
        lineHeight: 20,
    },
    itemsCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.card,
    },
    itemsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemsHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    itemsTitle: {
        ...typography.label_medium,
        color: colors.secondary.gray_900,
    },
    orderItem: {
        flexDirection: 'row',
        gap: spacing.md,
        paddingTop: spacing.md,
        marginTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.secondary.gray_100,
    },
    itemQuantity: {
        width: 28,
        height: 28,
        borderRadius: borderRadius.sm,
        backgroundColor: colors.secondary.gray_100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemQuantityText: {
        ...typography.label_small,
        color: colors.secondary.gray_900,
        fontWeight: '700',
    },
    itemDetails: {
        flex: 1,
    },
    itemNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.xs,
    },
    foodIndicator: {
        width: 16,
        height: 16,
        borderRadius: 2,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    foodDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    itemName: {
        ...typography.body_medium,
        color: colors.secondary.gray_900,
    },
    itemCustomizations: {
        ...typography.caption,
        color: colors.secondary.gray_600,
    },
    summaryCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.card,
    },
    summaryTitle: {
        ...typography.label_medium,
        color: colors.secondary.gray_900,
        marginBottom: spacing.md,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    summaryLabel: {
        ...typography.body_medium,
        color: colors.secondary.gray_600,
    },
    summaryValue: {
        ...typography.body_medium,
        color: colors.secondary.gray_900,
        fontWeight: '500',
    },
    summaryDivider: {
        height: 1,
        backgroundColor: colors.secondary.gray_200,
        marginVertical: spacing.md,
    },
    summaryLabelTotal: {
        ...typography.label_medium,
        color: colors.secondary.gray_900,
    },
    summaryValueTotal: {
        ...typography.h3,
        color: colors.secondary.gray_900,
    },
    paymentMethod: {
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.secondary.gray_200,
    },
    paymentLabel: {
        ...typography.body_small,
        color: colors.secondary.gray_600,
        marginBottom: spacing.sm,
    },
    paymentBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    paymentText: {
        ...typography.body_medium,
        color: colors.secondary.gray_900,
        fontWeight: '500',
    },
    earningsCard: {
        backgroundColor: colors.semantic.success_light,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
    },
    earningsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    earningsTitle: {
        ...typography.label_medium,
        color: colors.semantic.success,
        fontWeight: '600',
    },
    earningsBreakdown: {
        gap: spacing.sm,
    },
    earningsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    earningsLabel: {
        ...typography.body_medium,
        color: colors.secondary.gray_700,
    },
    earningsValue: {
        ...typography.body_medium,
        color: colors.secondary.gray_900,
        fontWeight: '500',
    },
    earningsDivider: {
        height: 1,
        backgroundColor: colors.semantic.success,
        opacity: 0.2,
        marginVertical: spacing.md,
    },
    earningsTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    earningsTotalLabel: {
        ...typography.label_large,
        color: colors.semantic.success,
    },
    earningsTotalValue: {
        ...typography.h2,
        color: colors.semantic.success,
        fontWeight: '700',
    },
    bottomAction: {
        padding: spacing.base,
        backgroundColor: colors.secondary.white,
        borderTopWidth: 1,
        borderTopColor: colors.secondary.gray_200,
        ...shadows.lg,
    },
});

export default OrderDetailScreen;
