import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const DetailRow = ({ label, value }: { label: string, value: string }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const VehicleDetailsScreen = () => {
    const { profile } = useSelector((state: RootState) => state.delivery);
    const { vehicle } = profile;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Vehicle Information</Text>
                <DetailRow label="Type" value={vehicle.type} />
                <DetailRow label="Model" value={vehicle.model} />
                <DetailRow label="License Plate" value={vehicle.plate} />
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>License Information</Text>
                <DetailRow label="Driving License No." value={vehicle.license} />
                <DetailRow label="Expiry Date" value="12/2028" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 16,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 8,
    },
    row: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    }
});

export default VehicleDetailsScreen;
