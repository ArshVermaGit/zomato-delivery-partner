import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock, Trophy } from 'lucide-react-native';
import { Incentive } from '../../store/slices/deliverySlice';

interface Props {
    incentive: Incentive;
}

const IncentiveCard: React.FC<Props> = ({ incentive }) => {
    const progress = incentive.current / incentive.target;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.iconBg}>
                    <Trophy size={20} color="#E23744" />
                </View>
                <View style={styles.titleInfo}>
                    <Text style={styles.title}>{incentive.title}</Text>
                    <Text style={styles.desc}>{incentive.description}</Text>
                </View>
                <View style={styles.rewardBox}>
                    <Text style={styles.reward}>₹{incentive.reward}</Text>
                </View>
            </View>

            <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                </View>
                <View style={styles.progressLabels}>
                    <Text style={styles.progressText}>{incentive.current}/{incentive.target}</Text>
                    <View style={styles.timer}>
                        <Clock size={12} color="#666" style={{ marginRight: 4 }} />
                        <Text style={styles.timerText}>{incentive.expiry} left</Text>
                    </View>
                </View>
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
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    iconBg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF0F1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    titleInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    desc: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    rewardBox: {
        justifyContent: 'center',
    },
    reward: {
        fontSize: 18,
        fontWeight: '800',
        color: '#2FB050',
    },
    progressContainer: {},
    progressBarBg: {
        height: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#E23744',
        borderRadius: 4,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#333',
    },
    timer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 12,
        color: '#666',
    }
});

export default IncentiveCard;
