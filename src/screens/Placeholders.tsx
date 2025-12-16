import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderScreen = ({ name }: { name: string }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.subText}>Coming Soon</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subText: {
        fontSize: 16,
        color: '#666',
    },
});

export const IncentivesScreen = () => <PlaceholderScreen name="Incentives" />;
export const PerformanceScreen = () => <PlaceholderScreen name="Performance" />;
export const MyDetailsScreen = () => <PlaceholderScreen name="My Details" />;
export const VehicleDetailsScreen = () => <PlaceholderScreen name="Vehicle Details" />;
export const DocumentsScreen = () => <PlaceholderScreen name="Documents" />;
export const HelpSupportScreen = () => <PlaceholderScreen name="Help & Support" />;
export const SafetyCenterScreen = () => <PlaceholderScreen name="Safety Center" />;
export const SOSScreen = () => <PlaceholderScreen name="SOS" />;
export const AccidentReportScreen = () => <PlaceholderScreen name="Accident Report" />;
