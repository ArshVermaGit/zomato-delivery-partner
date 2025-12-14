import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { setAvailability } from '../../store/slices/deliverySlice';
import { Power } from 'lucide-react-native';

interface Props {
    isOnline: boolean;
}

const AvailabilityToggle: React.FC<Props> = ({ isOnline }) => {
    const dispatch = useDispatch();

    const handleToggle = async () => {
        if (!isOnline) {
            // Going Online
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required to go online.');
                return;
            }
            // Haptic Feedback
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            dispatch(setAvailability(true));
        } else {
            // Going Offline
            Alert.alert(
                'Go Offline?',
                'You will stop receiving new orders.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Go Offline',
                        style: 'destructive',
                        onPress: () => {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                            dispatch(setAvailability(false));
                        }
                    }
                ]
            );
        }
    };

    return (
        <TouchableOpacity
            style={[styles.container, isOnline ? styles.online : styles.offline]}
            onPress={handleToggle}
            activeOpacity={0.8}
        >
            <View style={styles.iconContainer}>
                <Power size={24} color={isOnline ? '#2FB050' : '#666'} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.statusText}>
                    {isOnline ? "You're Online" : "You're Offline"}
                </Text>
                <Text style={styles.subText}>
                    {isOnline ? "Searching for orders..." : "Go online to start earning"}
                </Text>
            </View>
            <View style={[styles.indicator, isOnline ? styles.indicatorOnline : styles.indicatorOffline]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    online: {
        backgroundColor: '#E8F5E9',
        borderWidth: 1,
        borderColor: '#C8E6C9',
    },
    offline: {
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    statusText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    subText: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    indicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    indicatorOnline: {
        backgroundColor: '#2FB050',
    },
    indicatorOffline: {
        backgroundColor: '#BDBDBD',
    }
});

export default AvailabilityToggle;
