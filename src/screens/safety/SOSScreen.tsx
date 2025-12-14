import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, CheckCircle } from 'lucide-react-native';

const SOSScreen = () => {
    const navigation = useNavigation();
    const [count, setCount] = useState(5);
    const [status, setStatus] = useState('INIT'); // INIT, SENT

    useEffect(() => {
        if (count > 0 && status === 'INIT') {
            const timer = setInterval(() => setCount(c => c - 1), 1000);
            return () => clearInterval(timer);
        } else if (count === 0 && status === 'INIT') {
            setStatus('SENT');
            // Dispatch/API call would happen here
        }
    }, [count, status]);

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            {status === 'INIT' ? (
                <View style={styles.center}>
                    <Text style={styles.warningText}>SENDING SOS ALERT IN</Text>
                    <View style={styles.counterCircle}>
                        <Text style={styles.counterText}>{count}</Text>
                    </View>
                    <Text style={styles.desc}>
                        We will notify Zomato Safety Team and your emergency contacts.
                    </Text>
                    <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                        <Text style={styles.cancelText}>I AM SAFE</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.center}>
                    <CheckCircle size={80} color="#2FB050" style={{ marginBottom: 24 }} />
                    <Text style={styles.sentTitle}>Alert Sent</Text>
                    <Text style={styles.sentDesc}>
                        Help is on the way. Our safety team will call you shortly.
                    </Text>
                    <TouchableOpacity style={styles.callBtn}>
                        <Phone size={24} color="#FFF" style={{ marginRight: 8 }} />
                        <Text style={styles.callText}>Call Police (100)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeBtn} onPress={handleCancel}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    warningText: {
        color: '#E23744',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 32,
        letterSpacing: 2,
    },
    counterCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 8,
        borderColor: '#E23744',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    counterText: {
        color: '#FFF',
        fontSize: 80,
        fontWeight: '800',
    },
    desc: {
        color: '#888',
        textAlign: 'center',
        marginBottom: 48,
        fontSize: 16,
    },
    cancelBtn: {
        width: '100%',
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 16,
    },
    sentTitle: {
        fontSize: 32,
        color: '#FFF',
        fontWeight: '700',
        marginBottom: 16,
    },
    sentDesc: {
        color: '#CCC',
        textAlign: 'center',
        marginBottom: 48,
        fontSize: 18,
    },
    callBtn: {
        flexDirection: 'row',
        backgroundColor: '#E23744',
        width: '100%',
        padding: 16,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    callText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 18,
    },
    closeBtn: {
        padding: 16,
    },
    closeText: {
        color: '#888',
        fontSize: 16,
    }
});

export default SOSScreen;
