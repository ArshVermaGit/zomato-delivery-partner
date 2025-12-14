import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { RootState } from '../../store';
import { acceptIncomingOrder, rejectIncomingOrder } from '../../store/slices/deliverySlice';
import CircularCountdown from './CircularCountdown';
import { MapPin, Navigation, Clock, DollarSign, X } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const IncomingOrderModal = () => {
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(30);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const soundRef = useRef<Audio.Sound | null>(null);
    const { incomingOrder } = useSelector((state: RootState) => state.delivery);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (incomingOrder) {
            // Start Alert Loop
            playAlert();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); // Initial huge vibe

            interval = setInterval(() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }, 1000);
        } else {
            stopAlert();
        }

        return () => {
            stopAlert();
            if (interval) clearInterval(interval);
        };
    }, [incomingOrder]);

    async function playAlert() {
        // In real app, load a sound file. Using dummy logic for now as audio asset might not exist.
        // console.log('Playing alert sound...');
        // Implementation for loading local asset:
        // const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/alert.mp3'));
        // setSound(sound);
        // await sound.setIsLoopingAsync(true);
        // await sound.playAsync();
    }

    async function stopAlert() {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }
    }

    const handleAccept = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        dispatch(acceptIncomingOrder());
    };

    const handleReject = () => {
        // Show reason modal first? For MVP just reject.
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        Alert.alert(
            'Reject Order?',
            'Rejecting orders frequently may affect your rating.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reject',
                    style: 'destructive',
                    onPress: () => dispatch(rejectIncomingOrder())
                }
            ]
        );
    };

    const handleTimeout = () => {
        dispatch(rejectIncomingOrder());
    };

    if (!incomingOrder) return null;

    return (
        <Modal visible={true} transparent animationType="slide">
            <View style={styles.overlay}>
                {/* Header / Map Placeholder */}
                <View style={styles.mapPreview}>
                    <Text style={styles.mapText}>Map Preview</Text>
                    {/* Mock Route Lines */}
                    <View style={[styles.routeLine, { top: 100, left: 100 }]} />
                </View>

                {/* Bottom Card */}
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>New Request</Text>
                        <Text style={styles.price}>₹{145}</Text>
                    </View>

                    {/* Details */}
                    <View style={styles.details}>
                        <View style={styles.detailRow}>
                            <View style={styles.iconBg}><Clock size={16} color="#444" /></View>
                            <Text style={styles.detailText}>25 mins • 4.5 km</Text>
                        </View>

                        <View style={styles.locationContainer}>
                            <View style={styles.locationRow}>
                                <MapPin size={20} color="#E23744" />
                                <View style={styles.locTextCont}>
                                    <Text style={styles.locTitle}>{incomingOrder.restaurantName}</Text>
                                    <Text style={styles.locSub} numberOfLines={1}>{incomingOrder.pickupLocation}</Text>
                                </View>
                            </View>
                            <View style={styles.dashLine} />
                            <View style={styles.locationRow}>
                                <MapPin size={20} color="#2FB050" />
                                <View style={styles.locTextCont}>
                                    <Text style={styles.locTitle}>Customer</Text>
                                    <Text style={styles.locSub} numberOfLines={1}>{incomingOrder.dropLocation}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Actions */}
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
                            <X size={24} color="#1C1C1C" />
                            <Text style={styles.rejectText}>Reject</Text>
                        </TouchableOpacity>

                        <View style={styles.acceptContainer}>
                            <CircularCountdown
                                duration={30}
                                onComplete={handleTimeout}
                                radius={38}
                                strokeWidth={4}
                            />
                            <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                                <Text style={styles.acceptText}>Accept</Text>
                                <Text style={styles.acceptSub}>30s</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    mapPreview: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#E0E0E0', // Map color
        zIndex: -1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        color: '#888',
        fontSize: 24,
        fontWeight: '700',
    },
    routeLine: {
        width: 200,
        height: 100,
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        borderColor: '#333',
        position: 'absolute',
        transform: [{ rotate: '45deg' }],
    },
    card: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
    },
    price: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1C1C1C',
    },
    details: {
        marginBottom: 32,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#F5F5F5',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    iconBg: {
        marginRight: 8,
    },
    detailText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
    },
    locationContainer: {
        gap: 0,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locTextCont: {
        marginLeft: 12,
        flex: 1,
    },
    locTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    locSub: {
        fontSize: 14,
        color: '#666',
    },
    dashLine: {
        height: 24,
        borderLeftWidth: 1,
        borderLeftColor: '#CCC',
        borderStyle: 'dashed',
        marginLeft: 10,
        marginVertical: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rejectButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: '#F5F5F5',
    },
    rejectText: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: '600',
        color: '#1C1C1C',
    },
    acceptContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    acceptButton: {
        position: 'absolute',
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#2FB050',
        justifyContent: 'center',
        alignItems: 'center',
    },
    acceptText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFF',
    },
    acceptSub: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.8)',
    },
});

export default IncomingOrderModal;
