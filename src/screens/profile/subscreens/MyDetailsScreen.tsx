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

const MyDetailsScreen = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { profile } = useSelector((state: RootState) => state.delivery);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <DetailRow label="Full Name" value={user?.name || 'N/A'} />
                <DetailRow label="Phone Number" value={user?.phoneNumber || 'N/A'} />
                <DetailRow label="Email" value={user?.email || 'N/A'} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Emergency Contact</Text>
                <DetailRow label="Name" value={profile.emergencyContact.name} />
                <DetailRow label="Relationship" value="Brother" />
                <DetailRow label="Phone" value={profile.emergencyContact.phone} />
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
    section: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: 16,
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

export default MyDetailsScreen;
