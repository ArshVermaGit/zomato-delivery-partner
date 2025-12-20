import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { Transaction } from '../../store/slices/deliverySlice';

interface Props {
    transactions: Transaction[];
    limit?: number;
}

const TransactionList: React.FC<Props> = ({ transactions, limit }) => {
    const data = limit ? transactions.slice(0, limit) : transactions;

    return (
        <View style={styles.container}>
            {data.map((item) => (
                <View key={item.id} style={styles.item}>
                    <View style={styles.iconBox}>
                        {item.type === 'PAYOUT' ? (
                            <TrendingUp size={20} color="#E23744" />
                        ) : (
                            <TrendingDown size={20} color="#2FB050" />
                        )}
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.desc}>{item.description}</Text>
                        <Text style={styles.date}>{item.date} • {item.type}</Text>
                    </View>
                    <Text style={[styles.amount, item.amount < 0 ? styles.negative : styles.positive]}>
                        {item.amount < 0 ? '-' : '+'}₹{Math.abs(item.amount)}
                    </Text>
                </View>
            ))}
            {data.length === 0 && <Text style={styles.empty}>No transactions yet.</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    desc: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    amount: {
        fontSize: 16,
        fontWeight: '700',
    },
    positive: {
        color: '#2FB050',
    },
    negative: {
        color: '#1C1C1C',
    },
    empty: {
        textAlign: 'center',
        color: '#888',
        padding: 12,
    }
});

export default TransactionList;
