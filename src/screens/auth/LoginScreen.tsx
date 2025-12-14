import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess, updateOnboardingStatus } from '../../store/slices/authSlice';
import { AuthService } from '../../services/AuthService';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (phoneNumber.length < 10) return;

        setLoading(true);
        try {
            // In a real flow, this would be:
            // await AuthService.sendOtp(phoneNumber);
            // navigate('OTP', { phoneNumber });

            // For Dev/Demo without SMS Gateway:
            const user = await AuthService.login(phoneNumber);
            // Status and token are handled in AuthService

            // Navigate based on status if needed, or let AuthStack handle it via Redux state
        } catch (error) {
            console.error('Login Failed', error);
            // Fallback to mock for review if backend isn't running
            setTimeout(() => {
                dispatch(loginSuccess({
                    user: { id: '123', phoneNumber },
                    token: 'mock-token-123',
                }));
                dispatch(updateOnboardingStatus('NOT_STARTED'));
            }, 1000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Zomato Delivery</Text>
                    <Text style={styles.subtitle}>Partner with us and start earning</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Log in / Sign up</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.prefix}>+91</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Mobile Number"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            maxLength={10}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.button, phoneNumber.length < 10 && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={phoneNumber.length < 10 || loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Continue</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#E23744',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 50,
        marginBottom: 24,
    },
    prefix: {
        fontSize: 16,
        color: '#333',
        marginRight: 8,
        borderRightWidth: 1,
        borderRightColor: '#DDD',
        paddingRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#E23744',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#FACCD0',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default LoginScreen;
