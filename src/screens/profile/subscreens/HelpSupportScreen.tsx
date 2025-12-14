import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Phone, MessageSquare, AlertTriangle } from 'lucide-react-native';

const HelpSupportScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>How can we help you?</Text>
            </View>

            <View style={styles.options}>
                <TouchableOpacity style={styles.option} onPress={() => Linking.openURL('tel:100')}>
                    <View style={[styles.icon, { backgroundColor: '#FFE5E7' }]}>
                        <AlertTriangle size={24} color="#E23744" />
                    </View>
                    <Text style={styles.label}>Emergency SOS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <View style={[styles.icon, { backgroundColor: '#E3F2FD' }]}>
                        <MessageSquare size={24} color="#1565C0" />
                    </View>
                    <Text style={styles.label}>Chat with Us</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <View style={[styles.icon, { backgroundColor: '#E8F5E9' }]}>
                        <Phone size={24} color="#2FB050" />
                    </View>
                    <Text style={styles.label}>Call Support</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

            {['My payout is delayed', 'How to improve rating', 'Insurance claim process', 'Referral bonus issue'].map((q, i) => (
                <TouchableOpacity key={i} style={styles.faqItem}>
                    <Text style={styles.faqText}>{q}</Text>
                </TouchableOpacity>
            ))}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 32,
        paddingHorizontal: 16,
    },
    option: {
        alignItems: 'center',
    },
    icon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    faqTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 16,
        marginBottom: 16,
        color: '#1C1C1C',
    },
    faqItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    faqText: {
        fontSize: 16,
        color: '#333',
    }
});

export default HelpSupportScreen;
