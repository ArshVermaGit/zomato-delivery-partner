import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { ActiveOrder, completeOrderThunk } from '../../../store/slices/deliverySlice';
import { useNavigation } from '@react-navigation/native';

interface Props {
    order: ActiveOrder;
}

const ArrivedCustomerView: React.FC<Props> = ({ order }) => {
    const dispatch = useDispatch<any>();
    const navigation = useNavigation<any>();
    const [otp, setOtp] = useState('');

    const handleDeliver = () => {
        if (otp === order.deliveryOTP) {
            Alert.alert('Success', 'Order Delivered Successfully!', [
                {
                    text: 'Great',
                    onPress: () => {
                        dispatch(completeOrderThunk(order.id));
                        navigation.navigate('Home');
                    }
                }
            ]);
        } else {
            Alert.alert('Invalid OTP', 'Please ask customer for the correct 4-digit OTP.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>Arrived at Location</Text>
            </View>

            <View style={styles.otpCard}>
                <Text style={styles.label}>Ask Customer for OTP</Text>
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

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.mainButton, otp.length !== 4 && styles.disabled]}
                    onPress={handleDeliver}
                    disabled={otp.length !== 4}
                >
                    <Text style={styles.buttonText}>Complete Delivery</Text>
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
        backgroundColor: '#E8F5E9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    bannerText: {
        color: '#2FB050',
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
        borderBottomColor: '#2FB050',
        width: 200,
        paddingBottom: 8,
    },
    footer: {
        marginTop: 'auto',
        paddingTop: 16,
    },
    mainButton: {
        backgroundColor: '#2FB050',
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

export default ArrivedCustomerView;
