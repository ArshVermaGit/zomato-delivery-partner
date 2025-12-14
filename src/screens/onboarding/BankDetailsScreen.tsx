import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateOnboardingStatus } from '../../store/slices/authSlice';

const BankDetailsScreen = () => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const [accountNumber, setAccountNumber] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [holderName, setHolderName] = useState('');

    const isValid = accountNumber && confirmAccountNumber && ifsc && holderName && accountNumber === confirmAccountNumber;

    const handleSubmit = () => {
        // Submit banking data via API here
        // ...
        // Move to verification pending
        dispatch(updateOnboardingStatus('VERIFICATION_PENDING'));
        navigation.reset({
            index: 0,
            routes: [{ name: 'VerificationStatus' }],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bank Details</Text>
                <Text style={styles.subtitle}>For weekly payouts and bonuses</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.label}>Account Details</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Account Holder Name"
                    value={holderName}
                    onChangeText={setHolderName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Account Number"
                    keyboardType="number-pad"
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Account Number"
                    keyboardType="number-pad"
                    value={confirmAccountNumber}
                    onChangeText={setConfirmAccountNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="IFSC Code"
                    autoCapitalize="characters"
                    maxLength={11}
                    value={ifsc}
                    onChangeText={setIfsc}
                />

                <Text style={styles.helperText}>
                    Please ensure the bank account belongs to you. Payouts are processed every Wednesday.
                </Text>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.button, !isValid && styles.disabledButton]}
                    disabled={!isValid}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Submit Application</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    content: {
        padding: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 16,
        height: 50,
        fontSize: 16,
        marginBottom: 16,
        color: '#333',
    },
    helperText: {
        fontSize: 13,
        color: '#888',
        marginTop: 8,
        lineHeight: 20,
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    button: {
        backgroundColor: '#2FB050', // Green for final submit
        height: 52,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#CCC',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default BankDetailsScreen;
