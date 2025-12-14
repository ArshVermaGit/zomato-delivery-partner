import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { requestPayout } from '../../store/slices/deliverySlice';
import { Landmark, ArrowRight } from 'lucide-react-native';

const PayoutScreen = () => {
    const dispatch = useDispatch();
    const { earnings, payouts } = useSelector((state: RootState) => state.delivery);
    const [loading, setLoading] = useState(false);

    const handleWithdraw = (method: 'INSTANT' | 'WEEKLY') => {
        if (earnings.pending < 100) {
            Alert.alert('Low Balance', 'Minimum withdrawal amount is ₹100');
            return;
        }

        Alert.alert(
            'Confirm Withdrawal',
            `Transfer ₹${earnings.pending} via ${method === 'INSTANT' ? 'Instant Transfer (₹10 fee)' : 'Standard Payout'}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        setLoading(true);
                        setTimeout(() => {
                            dispatch(requestPayout({ amount: earnings.pending, method }));
                            setLoading(false);
                            Alert.alert('Success', 'Payout request submitted successfully.');
                        }, 1500);
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.balanceLabel}>Total Balance</Text>
                <Text style={styles.balance}>₹{earnings.pending}</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Withdraw to</Text>
                    <View style={styles.bankCard}>
                        <Landmark size={24} color="#666" />
                        <View style={styles.bankInfo}>
                            <Text style={styles.bankName}>HDFC Bank</Text>
                            <Text style={styles.account}>**** **** 1234</Text>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <Text style={styles.verifiedText}>Verified</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => handleWithdraw('INSTANT')}
                    >
                        <View>
                            <Text style={styles.optionTitle}>Instant Payout</Text>
                            <Text style={styles.optionSub}>Credit in 5 mins • ₹10 fee</Text>
                        </View>
                        <ArrowRight size={20} color="#666" />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => handleWithdraw('WEEKLY')}
                    >
                        <View>
                            <Text style={styles.optionTitle}>Standard Payout</Text>
                            <Text style={styles.optionSub}>Credit by 12th Dec • Free</Text>
                        </View>
                        <ArrowRight size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>History</Text>
                {payouts.map(payout => (
                    <View key={payout.id} style={styles.historyItem}>
                        <View>
                            <Text style={styles.pLabel}>Payout to Bank</Text>
                            <Text style={styles.pDate}>{payout.date}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.pAmount}>-₹{payout.amount}</Text>
                            <Text style={[styles.pStatus, payout.status === 'COMPLETED' ? styles.c : styles.p]}>
                                {payout.status}
                            </Text>
                        </View>
                    </View>
                ))}

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#1C1C1C',
        padding: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    balanceLabel: {
        color: '#888',
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: '600',
    },
    balance: {
        color: '#FFF',
        fontSize: 40,
        fontWeight: '700',
        marginTop: 8,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 12,
        marginLeft: 4,
    },
    bankCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        elevation: 1,
    },
    bankInfo: {
        marginLeft: 16,
        flex: 1,
    },
    bankName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    account: {
        color: '#888',
        marginTop: 2,
    },
    verifiedBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    verifiedText: {
        color: '#2FB050',
        fontSize: 10,
        fontWeight: '700',
    },
    actions: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginBottom: 24,
        elevation: 1,
    },
    option: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1C',
    },
    optionSub: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 8,
    },
    pLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    pDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    pAmount: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    pStatus: {
        fontSize: 10,
        fontWeight: '700',
        marginTop: 2,
    },
    c: { color: '#2FB050' },
    p: { color: '#FF9800' }
});

export default PayoutScreen;
