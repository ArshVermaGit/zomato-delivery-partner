import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import IncentiveCard from '../../components/performance/IncentiveCard';

const IncentivesScreen = () => {
    const { incentives } = useSelector((state: RootState) => state.delivery);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Your Incentives</Text>
                    <Text style={styles.subtitle}>Complete targets to earn extra!</Text>
                </View>

                {incentives.map(incentive => (
                    <IncentiveCard key={incentive.id} incentive={incentive} />
                ))}

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>Incentives are calculated daily and added to your earnings automatically upon completion.</Text>
                </View>
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
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    infoBox: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#E3F2FD',
        borderRadius: 8,
    },
    infoText: {
        color: '#1565C0',
        fontSize: 12,
        textAlign: 'center',
    }
});

export default IncentivesScreen;
