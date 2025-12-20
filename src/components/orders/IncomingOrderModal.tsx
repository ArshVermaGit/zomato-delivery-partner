import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Vibration,
    Platform
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedProps,
    withTiming,
    withSequence,
    runOnJS,
    Easing
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Audio } from 'expo-av';
import { MapPin, Navigation, DollarSign, Clock, Package, MoreVertical, X, Check } from 'lucide-react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';
import * as Haptics from 'expo-haptics';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Helper functions for earnings (mock)
const calculateDistance = () => {
    // Mock Haversine or similar
    return 4.2; // km
};

const calculateEarnings = (distance: number) => {
    return Math.round(30 + (distance * 12));
};

export const IncomingOrderModal = ({ visible, order, onAccept, onReject }: any) => {
    const [timeLeft, setTimeLeft] = useState(30);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const progress = useSharedValue(1);
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);

    // Sound & Action Handlers
    const playAlertSound = React.useCallback(async () => {
        try {
            // Ensure asset exists or wrap in try/catch to avoid crash if missing
            try {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    require('../../assets/sounds/order-alert.mp3'),
                    { shouldPlay: true, isLooping: true }
                );
                setSound(newSound);
            } catch (e) {
                console.warn("Sound file not found or failed to load", e);
            }
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }, []);

    const stopSound = React.useCallback(async () => {
        if (sound) {
            try {
                await sound.stopAsync();
                await sound.unloadAsync();
            } catch (e) { console.log(e); }
        }
    }, [sound]);

    const handleAutoReject = React.useCallback(async () => {
        await stopSound();
        Vibration.vibrate(1000);
        onReject(order, 'timeout');
    }, [order, onReject, stopSound]);

    const handleAccept = React.useCallback(async () => {
        await stopSound();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        opacity.value = withTiming(0, { duration: 200 }, () => {
            runOnJS(onAccept)(order);
        });
    }, [order, onAccept, stopSound, opacity]);

    const handleReject = React.useCallback(async () => {
        await stopSound();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        opacity.value = withTiming(0, { duration: 200 }, () => {
            runOnJS(onReject)(order);
        });
    }, [order, onReject, stopSound, opacity]);

    // Start countdown and animations
    useEffect(() => {
        let interval: any;
        if (visible && order) {
            // Play alert sound
            playAlertSound();

            // Vibration pattern
            if (Platform.OS === 'ios') {
                Vibration.vibrate([0, 400, 200, 400]);
            } else {
                Vibration.vibrate([0, 400, 200, 400, 200, 400]);
            }

            // Reset countdown
            setTimeLeft(30);
            progress.value = 1;
            opacity.value = withTiming(1, { duration: 300 });

            // Pulse animation for modal
            scale.value = withSequence(
                withTiming(0.95, { duration: 100 }),
                withTiming(1, { duration: 100 })
            );

            // Countdown timer
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        runOnJS(handleAutoReject)();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
            stopSound();
        };
    }, [visible, order, handleAutoReject, opacity, progress, scale, stopSound]);

    // Update progress circle
    useEffect(() => {
        progress.value = withTiming(timeLeft / 30, {
            duration: 1000,
            easing: Easing.linear,
        });
    }, [timeLeft, progress]);

    const modalStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const circleCircumference = 2 * Math.PI * 70;

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: circleCircumference * (1 - progress.value),
        };
    });

    if (!visible || !order) return null;

    // Calculate distance and earnings
    // Using safely provided locations or defaults
    const pickup = order.pickupLocation || { lat: 28.6139, lng: 77.2090 };
    const drop = order.dropLocation || { lat: 28.5355, lng: 77.3910 };

    const distance = calculateDistance();
    const estimatedEarnings = calculateEarnings(distance);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={handleReject}
        >
            <View style={styles.overlay}>
                <Animated.View style={[styles.modal, modalStyle]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.pulseContainer}>
                            <View style={[styles.pulse, styles.pulseOuter]} />
                            <View style={[styles.pulse, styles.pulseInner]} />
                            <View style={styles.iconContainer}>
                                <Package size={32} color={colors.primary.zomato_red} />
                            </View>
                        </View>
                        <Text style={styles.headerTitle}>New Order Request</Text>
                        <Text style={styles.headerSubtitle}>Accept within {timeLeft}s</Text>
                    </View>

                    {/* Countdown Circle */}
                    <View style={styles.countdownContainer}>
                        <Svg width={180} height={180}>
                            {/* Background circle */}
                            <Circle
                                cx={90}
                                cy={90}
                                r={70}
                                stroke={colors.secondary.gray_200}
                                strokeWidth={8}
                                fill="transparent"
                            />
                            {/* Progress circle */}
                            <AnimatedCircle
                                cx={90}
                                cy={90}
                                r={70}
                                stroke={timeLeft <= 10 ? colors.semantic.error : colors.primary.zomato_red}
                                strokeWidth={8}
                                fill="transparent"
                                strokeDasharray={circleCircumference}
                                strokeLinecap="round"
                                transform={`rotate(-90 90 90)`}
                                animatedProps={animatedProps}
                            />
                        </Svg>
                        <View style={styles.countdownContent}>
                            <Text style={[
                                styles.countdownNumber,
                                timeLeft <= 10 && { color: colors.semantic.error }
                            ]}>
                                {timeLeft}
                            </Text>
                            <Text style={styles.countdownLabel}>seconds</Text>
                        </View>
                    </View>

                    {/* Earnings */}
                    <View style={styles.earningsContainer}>
                        <View style={styles.earningsBadge}>
                            <DollarSign size={24} color={colors.semantic.success} />
                            <Text style={styles.earningsAmount}>₹{order.amount || estimatedEarnings}</Text>
                        </View>
                        <Text style={styles.earningsLabel}>Estimated Earnings</Text>
                        {order.peakHourBonus && (
                            <View style={styles.bonusBadge}>
                                <Text style={styles.bonusText}>+₹{order.peakHourBonus} Peak Hour Bonus</Text>
                            </View>
                        )}
                    </View>

                    {/* Map Preview */}
                    <View style={styles.mapContainer}>
                        {/* MapView might crash on emulator without Google Play Services or heavy setup 
                 Using a simplified view or placeholder if map fails is good practice, 
                 but for this request we act as if it works. 
             */}
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: (pickup.lat + drop.lat) / 2,
                                longitude: (pickup.lng + drop.lng) / 2,
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.1,
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            pitchEnabled={false}
                            rotateEnabled={false}
                        >
                            {/* Pickup marker */}
                            <Marker
                                coordinate={{
                                    latitude: pickup.lat,
                                    longitude: pickup.lng,
                                }}
                            >
                                <View style={styles.markerPickup}>
                                    <MapPin size={20} color={colors.secondary.white} />
                                </View>
                            </Marker>

                            {/* Drop marker */}
                            <Marker
                                coordinate={{
                                    latitude: drop.lat,
                                    longitude: drop.lng,
                                }}
                            >
                                <View style={styles.markerDrop}>
                                    <Navigation size={20} color={colors.secondary.white} />
                                </View>
                            </Marker>

                            {/* Route line */}
                            <Polyline
                                coordinates={[
                                    {
                                        latitude: pickup.lat,
                                        longitude: pickup.lng,
                                    },
                                    {
                                        latitude: drop.lat,
                                        longitude: drop.lng,
                                    },
                                ]}
                                strokeColor={colors.primary.zomato_red}
                                strokeWidth={3}
                                lineDashPattern={[1]}
                            />
                        </MapView>
                        <View style={styles.mapOverlay}>
                            <View style={styles.distanceBadge}>
                                <Text style={styles.distanceText}>{distance} km</Text>
                            </View>
                        </View>
                    </View>

                    {/* Location Details */}
                    <View style={styles.locations}>
                        {/* Pickup */}
                        <View style={styles.locationItem}>
                            <View style={styles.locationIcon}>
                                <MapPin size={20} color={colors.primary.zomato_red} />
                            </View>
                            <View style={styles.locationText}>
                                <Text style={styles.locationLabel}>Pickup from</Text>
                                <Text style={styles.locationName} numberOfLines={1}>
                                    {order.restaurantName}
                                </Text>
                                <Text style={styles.locationAddress} numberOfLines={1}>
                                    {order.restaurantAddress || order.pickupAddress}
                                </Text>
                            </View>
                        </View>

                        {/* Divider */}
                        <View style={styles.locationDivider}>
                            <View style={styles.dashedLine} />
                            <MoreVertical size={16} color={colors.secondary.gray_400} />
                        </View>

                        {/* Drop */}
                        <View style={styles.locationItem}>
                            <View style={[styles.locationIcon, { backgroundColor: colors.semantic.success_light }]}>
                                <Navigation size={20} color={colors.semantic.success} />
                            </View>
                            <View style={styles.locationText}>
                                <Text style={styles.locationLabel}>Deliver to</Text>
                                <Text style={styles.locationName} numberOfLines={1}>
                                    {order.customerName}
                                </Text>
                                <Text style={styles.locationAddress} numberOfLines={1}>
                                    {order.customerAddress || order.dropAddress}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Order Details */}
                    <View style={styles.orderDetails}>
                        <View style={styles.detailItem}>
                            <Clock size={16} color={colors.secondary.gray_600} />
                            <Text style={styles.detailText}>
                                {order.estimatedTime || 25} mins
                            </Text>
                        </View>
                        <View style={styles.detailDivider} />
                        <View style={styles.detailItem}>
                            <Package size={16} color={colors.secondary.gray_600} />
                            <Text style={styles.detailText}>
                                {order.items?.length || 2} items
                            </Text>
                        </View>
                        <View style={styles.detailDivider} />
                        <View style={styles.detailItem}>
                            <DollarSign size={16} color={colors.secondary.gray_600} />
                            <Text style={styles.detailText}>
                                ₹{order.amount || estimatedEarnings}
                            </Text>
                        </View>
                    </View>

                    {/* Actions */}
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={styles.rejectButton}
                            onPress={handleReject}
                            activeOpacity={0.7}
                        >
                            <X size={20} color={colors.secondary.gray_600} />
                            <Text style={styles.rejectText}>Reject</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.acceptButton}
                            onPress={handleAccept}
                            activeOpacity={0.9}
                        >
                            <Check size={24} color={colors.secondary.white} />
                            <Text style={styles.acceptText}>Accept Order</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Warning */}
                    <Text style={styles.warningText}>
                        Frequent rejections may affect your account
                    </Text>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.base,
    },
    modal: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius['2xl'],
        width: '100%',
        maxHeight: '90%',
        ...shadows.xl,
    },
    header: {
        alignItems: 'center',
        paddingTop: spacing.xl,
        paddingHorizontal: spacing.base,
    },
    pulseContainer: {
        position: 'relative',
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.base,
    },
    pulse: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primary.zomato_red,
        opacity: 0.3,
    },
    pulseOuter: {
        transform: [{ scale: 1.3 }],
    },
    pulseInner: {
        transform: [{ scale: 1.15 }],
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.primary.zomato_red_tint,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        ...typography.h2,
        color: colors.secondary.gray_900,
        marginBottom: spacing.xs,
    },
    headerSubtitle: {
        ...typography.body_medium,
        color: colors.secondary.gray_600,
    },
    countdownContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: spacing.xl,
        position: 'relative',
    },
    countdownContent: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    countdownNumber: {
        ...typography.display_large,
        fontSize: 48,
        color: colors.primary.zomato_red,
        fontWeight: '700',
    },
    countdownLabel: {
        ...typography.body_small,
        color: colors.secondary.gray_600,
    },
    earningsContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    earningsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.semantic.success_light,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.full,
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    earningsAmount: {
        ...typography.display_medium,
        color: colors.semantic.success,
        fontWeight: '700',
    },
    earningsLabel: {
        ...typography.body_medium,
        color: colors.secondary.gray_600,
    },
    bonusBadge: {
        marginTop: spacing.sm,
        backgroundColor: colors.semantic.warning_light,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
    },
    bonusText: {
        ...typography.label_small,
        color: colors.semantic.warning,
        fontWeight: '600',
    },
    mapContainer: {
        height: 150,
        marginHorizontal: spacing.base,
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        marginBottom: spacing.base,
        position: 'relative',
    },
    map: {
        flex: 1,
    },
    mapOverlay: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
    },
    distanceBadge: {
        backgroundColor: colors.secondary.white,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        ...shadows.md,
    },
    distanceText: {
        ...typography.label_small,
        color: colors.secondary.gray_900,
        fontWeight: '700',
    },
    markerPickup: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.primary.zomato_red,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.md,
    },
    markerDrop: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.semantic.success,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.md,
    },
    locations: {
        paddingHorizontal: spacing.base,
        marginBottom: spacing.base,
    },
    locationItem: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    locationIcon: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.primary.zomato_red_tint,
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationText: {
        flex: 1,
    },
    locationLabel: {
        ...typography.caption,
        color: colors.secondary.gray_600,
        marginBottom: 2,
    },
    locationName: {
        ...typography.label_medium,
        color: colors.secondary.gray_900,
        marginBottom: 2,
    },
    locationAddress: {
        ...typography.body_small,
        color: colors.secondary.gray_600,
    },
    locationDivider: {
        alignItems: 'center',
        paddingVertical: spacing.sm,
        marginLeft: 20,
    },
    dashedLine: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 2,
        borderLeftWidth: 2,
        borderLeftColor: colors.secondary.gray_300,
        borderStyle: 'dashed',
    },
    orderDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        backgroundColor: colors.secondary.gray_50,
        marginHorizontal: spacing.base,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.base,
        gap: spacing.md,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    detailText: {
        ...typography.body_small,
        color: colors.secondary.gray_900,
        fontWeight: '500',
    },
    detailDivider: {
        width: 1,
        height: 16,
        backgroundColor: colors.secondary.gray_300,
    },
    actions: {
        flexDirection: 'row',
        paddingHorizontal: spacing.base,
        gap: spacing.md,
        marginBottom: spacing.base,
    },
    rejectButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        backgroundColor: colors.secondary.gray_100,
        borderRadius: borderRadius.xl,
        gap: spacing.sm,
    },
    rejectText: {
        ...typography.label_large,
        color: colors.secondary.gray_700,
    },
    acceptButton: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        backgroundColor: colors.semantic.success,
        borderRadius: borderRadius.xl,
        gap: spacing.sm,
        ...shadows.lg,
    },
    acceptText: {
        ...typography.label_large,
        color: colors.secondary.white,
        fontWeight: '700',
    },
    warningText: {
        ...typography.caption,
        color: colors.secondary.gray_500,
        textAlign: 'center',
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.base,
    },
});

export default IncomingOrderModal;
