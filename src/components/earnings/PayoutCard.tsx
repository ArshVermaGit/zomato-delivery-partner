import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Wallet } from 'lucide-react-native';

interface Props {
    balance: number;
}

const PayoutCard: React.FC<Props> = ({ balance }) => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.card}>
            <View style={styles.left}>
                <Text style={styles.label}>Available Balance</Text>
                <Text style={styles.amount}>₹{balance}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('PayoutScreen')}
            >
                <Wallet size={16} color="#FFF" style={{ marginRight: 6 }} />
                <Text style={styles.btnText}>Withdraw</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1C1C1C',
        borderRadius: 12,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    left: {},
    label: {
        color: '#888',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    amount: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: '700',
    },
    button: {
        backgroundColor: '#E23744',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 14,
    }
});

export default PayoutCard;
