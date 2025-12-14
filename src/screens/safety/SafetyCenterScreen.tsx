import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Shield, Share2, AlertOctagon, FileText, Phone } from 'lucide-react-native';
import SOSButton from '../../components/safety/SOSButton';

const SafetyCenterScreen = () => {
    const navigation = useNavigation<any>();

    const handleShareLocation = async () => {
        try {
            await Share.share({
                message: 'I am using Zomato Safety features. Here is my live location: https://maps.google.com/?q=28.5355,77.3910',
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Shield size={32} color="#1C1C1C" />
                    <Text style={styles.title}>Safety Center</Text>
                    <Text style={styles.subtitle}>We are here for you, always.</Text>
                </View>

                <SOSButton />

                <View style={styles.grid}>
                    <TouchableOpacity style={styles.card} onPress={handleShareLocation}>
                        <View style={[styles.iconBg, { backgroundColor: '#E3F2FD' }]}>
                            <Share2 size={24} color="#1565C0" />
                        </View>
                        <Text style={styles.cardText}>Share Live Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('AccidentReport')}
                    >
                        <View style={[styles.iconBg, { backgroundColor: '#FFEBEE' }]}>
                            <AlertOctagon size={24} color="#C62828" />
                        </View>
                        <Text style={styles.cardText}>Report Accident</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <View style={[styles.iconBg, { backgroundColor: '#E8F5E9' }]}>
                            <FileText size={24} color="#2E7D32" />
                        </View>
                        <Text style={styles.cardText}>Insurance Claim</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <View style={[styles.iconBg, { backgroundColor: '#FFF3E0' }]}>
                            <Phone size={24} color="#EF6C00" />
                        </View>
                        <Text style={styles.cardText}>Safety Hotline</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>Safety First</Text>
                    <Text style={styles.infoDesc}>
                        Remember to wear your helmet and follow traffic rules. Your safety is our top priority.
                    </Text>
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
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1C',
        marginTop: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    card: {
        width: '48%',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
        elevation: 2,
    },
    iconBg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    infoBox: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#2FB050',
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    infoDesc: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    }
});

export default SafetyCenterScreen;
