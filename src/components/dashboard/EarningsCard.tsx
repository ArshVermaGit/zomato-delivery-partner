import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IndianRupee, ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface EarningsCardProps {
    todayEarnings: number;
}

const EarningsCard: React.FC<EarningsCardProps> = ({ todayEarnings }) => {
    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Earnings')}
        >
            <View style={styles.content}>
                <View>
                    <Text style={styles.label}>TODAY'S EARNINGS</Text>
                    <View style={styles.amountContainer}>
                        <IndianRupee size={24} color="#1C1C1C" strokeWidth={2.5} />
                        <Text style={styles.amount}>{todayEarnings}</Text>
                    </View>
                </View>
                <ChevronRight size={24} color="#888" />
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>See detailed breakdown</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        fontSize: 10,
        fontWeight: '700',
        color: '#888888',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amount: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1C1C1C',
        marginLeft: 2,
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    footerText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    }
});

export default EarningsCard;
