import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const AccidentReportScreen = () => {
    const navigation = useNavigation();
    const [desc, setDesc] = useState('');

    const handleSubmit = () => {
        Alert.alert('Report Submitted', 'Our team has been notified and will contact you immediately.');
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Report Accident</Text>
            </View>

            <ScrollView contentContainerStyle={styles.form}>
                <View style={styles.locBox}>
                    <MapPin size={20} color="#666" style={{ marginRight: 8 }} />
                    <Text style={styles.locText}>Detected Location: Sector 18, Noida</Text>
                </View>

                <Text style={styles.label}>Add Photos (Optional)</Text>
                <TouchableOpacity style={styles.photoBtn}>
                    <Camera size={24} color="#888" />
                    <Text style={styles.photoText}>Tap to take photo</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Describe the incident</Text>
                <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={4}
                    placeholder="What happened?"
                    value={desc}
                    onChangeText={setDesc}
                    textAlignVertical="top"
                />

                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.submitText}>SUBMIT REPORT</Text>
                </TouchableOpacity>

                <Text style={styles.hint}>
                    In case of serious injury, please call an ambulance (102) immediately.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    form: {
        padding: 24,
    },
    locBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 12,
        borderRadius: 8,
        marginBottom: 24,
    },
    locText: {
        color: '#333',
        fontWeight: '500',
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    photoBtn: {
        height: 120,
        borderWidth: 2,
        borderColor: '#EEE',
        borderStyle: 'dashed',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    photoText: {
        marginTop: 8,
        color: '#888',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 12,
        padding: 16,
        height: 120,
        marginBottom: 32,
        fontSize: 16,
    },
    submitBtn: {
        backgroundColor: '#E23744',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    submitText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    hint: {
        color: '#888',
        textAlign: 'center',
        fontSize: 12,
    }
});

export default AccidentReportScreen;
