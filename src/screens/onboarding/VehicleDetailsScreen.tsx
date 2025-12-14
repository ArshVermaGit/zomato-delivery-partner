import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Bike, Car, Truck } from 'lucide-react-native';

const VEHICLE_TYPES = [
    { id: 'bicycle', label: 'Bicycle', icon: Bike },
    { id: 'bike', label: 'Bike', icon: Bike },
    { id: 'scooter', label: 'Scooter', icon: Bike },
    { id: 'car', label: 'Car', icon: Car },
];

const VehicleDetailsScreen = () => {
    const navigation = useNavigation<any>();
    const [vehicleType, setVehicleType] = useState('bike');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');

    const isValid = vehicleNumber && vehicleModel && licenseNumber && vehicleType;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Vehicle Details</Text>
                <Text style={styles.subtitle}>Tell us about your vehicle</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.label}>Select Vehicle Type</Text>
                <View style={styles.typeContainer}>
                    {VEHICLE_TYPES.map((type) => {
                        const Icon = type.icon;
                        const isSelected = vehicleType === type.id;
                        return (
                            <TouchableOpacity
                                key={type.id}
                                style={[styles.typeChip, isSelected && styles.selectedChip]}
                                onPress={() => setVehicleType(type.id)}
                            >
                                <Icon size={20} color={isSelected ? '#FFF' : '#666'} />
                                <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>
                                    {type.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {vehicleType !== 'bicycle' && (
                    <>
                        <Text style={styles.label}>Vehicle Information</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Vehicle Number (e.g. MH 02 AB 1234)"
                            value={vehicleNumber}
                            onChangeText={setVehicleNumber}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Vehicle Model (e.g. Honda Activa)"
                            value={vehicleModel}
                            onChangeText={setVehicleModel}
                        />

                        <Text style={styles.label}>Driving License</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="License Number"
                            value={licenseNumber}
                            onChangeText={setLicenseNumber}
                        />
                    </>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.button, !isValid && vehicleType !== 'bicycle' && styles.disabledButton]}
                    disabled={!isValid && vehicleType !== 'bicycle'}
                    onPress={() => navigation.navigate('BankDetails')}
                >
                    <Text style={styles.buttonText}>Next: Bank Details</Text>
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
        marginBottom: 12,
        marginTop: 8,
    },
    typeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    typeChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFF',
    },
    selectedChip: {
        backgroundColor: '#E23744',
        borderColor: '#E23744',
    },
    chipText: {
        marginLeft: 8,
        color: '#666',
        fontWeight: '500',
    },
    selectedChipText: {
        color: '#FFF',
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
    footer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    button: {
        backgroundColor: '#E23744',
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

export default VehicleDetailsScreen;
