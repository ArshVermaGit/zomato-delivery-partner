import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Phone, Navigation } from 'lucide-react-native';

interface OrderInfoCardProps {
    title: string;
    name: string;
    address: string;
    phone: string;
    type: 'restaurant' | 'customer';
}

const OrderInfoCard: React.FC<OrderInfoCardProps> = ({ title, name, address, phone, type }) => {

    const handleCall = () => {
        Linking.openURL(`tel:${phone}`);
    };

    const handleNavigate = () => {
        // Open maps with address query
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        Linking.openURL(url);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.headerTitle}>{title}</Text>

            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.address}>{address}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                    <Phone size={20} color="#E23744" />
                    <Text style={styles.callText}>Call</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={handleNavigate}>
                    <Navigation size={20} color="#FFF" />
                    <Text style={styles.navText}>Navigate</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    content: {
        marginBottom: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: 4,
    },
    address: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    callButton: {
        flex: 1,
        height: 44,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E23744',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    callText: {
        color: '#E23744',
        marginLeft: 8,
        fontWeight: '600',
    },
    navButton: {
        flex: 2,
        height: 44,
        borderRadius: 8,
        backgroundColor: '#2FB050',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navText: {
        color: '#FFF',
        marginLeft: 8,
        fontWeight: '600',
    }
});

export default OrderInfoCard;
