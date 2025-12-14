import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import PayoutCard from '../../components/earnings/PayoutCard';
import TransactionList from '../../components/earnings/TransactionList';
import EarningsCard from '../../components/dashboard/EarningsCard';

const EarningsScreen = () => {
    const { earnings, transactions } = useSelector((state: RootState) => state.delivery);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Earnings</Text>

                <PayoutCard balance={earnings.pending} />

                <EarningsCard todayEarnings={earnings.today} />

                <Text style={styles.sectionTitle}>Recent Transactions</Text>
                <TransactionList transactions={transactions} limit={10} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginTop: 24,
        marginBottom: 12,
    }
});

export default EarningsScreen;
