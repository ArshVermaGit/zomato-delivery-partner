import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { ActiveOrder, updateOrderStatus } from '../../../store/slices/deliverySlice';
import OrderItemsList from '../../../components/orders/OrderItemsList';

interface Props {
    order: ActiveOrder;
}

const ArrivedRestaurantView: React.FC<Props> = ({ order }) => {
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');

    const handlePickup = () => {
        if (otp === order.pickupOTP) {
            dispatch(updateOrderStatus('PICKED_UP'));
        } else {
            Alert.alert('Invalid OTP', 'Please enter the correct 4-digit OTP shown in the restaurant app.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>Waiting for Food</Text>
            </View>

            <View style={styles.otpCard}>
                <Text style={styles.label}>Ask Restaurant for OTP</Text>
                <TextInput
                    style={styles.otpInput}
                    placeholder="Enter 4-digit OTP"
                    keyboardType="number-pad"
                    maxLength={4}
                    value={otp}
                    onChangeText={setOtp}
                    textAlign="center"
                />
            </View>

            <OrderItemsList items={order.items} />

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.mainButton, otp.length !== 4 && styles.disabled]}
                    onPress={handlePickup}
                    disabled={otp.length !== 4}
                >
                    <Text style={styles.buttonText}>Verify & Pick Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        backgroundColor: '#FFF3E0',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    bannerText: {
        color: '#FF9800',
        fontWeight: '700',
        fontSize: 16,
    },
    otpCard: {
        backgroundColor: '#FFF',
        padding: 24,
        borderRadius: 12,
        marginBottom: 16,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    otpInput: {
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#E23744',
        width: 200,
        paddingBottom: 8,
    },
    footer: {
        marginTop: 'auto',
        paddingTop: 16,
    },
    mainButton: {
        backgroundColor: '#E23744',
        height: 52,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabled: {
        backgroundColor: '#CCC',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default ArrivedRestaurantView;
