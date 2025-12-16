import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
    ChevronLeft,
    Wallet,
    Info,
    Calendar,
    Zap,
    Building2,
    CheckCircle,
    ChevronRight,
    XCircle,
    Shield
} from 'lucide-react-native';
import { colors, typography, shadows } from '@zomato/design-tokens';
import { Button } from '@zomato/ui';
import { useNavigation } from '@react-navigation/native';

// Local theme constants
const spacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 24, xl: 32 };
const borderRadius = { sm: 4, md: 8, lg: 12, xl: 16, full: 999 };

export const PayoutScreen = () => {
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState<'daily' | 'instant'>('daily');
    const [showHistory, setShowHistory] = useState(false);

    const availableBalance = 8750;
    const instantPayoutFee = 10;
    const minPayoutAmount = 100;

    const bankAccount = {
        holderName: 'Rajesh Kumar',
        accountNumber: '****6789',
        ifsc: 'HDFC0001234',
        bankName: 'HDFC Bank',
    };

    const payoutHistory = [
        { id: '1', amount: 7500, date: '2024-12-10', status: 'completed', method: 'daily' },
        { id: '2', amount: 6800, date: '2024-12-03', status: 'completed', method: 'daily' },
        { id: '3', amount: 500, date: '2024-11-28', status: 'failed', method: 'instant' },
        { id: '4', amount: 8200, date: '2024-11-25', status: 'completed', method: 'daily' },
    ];

    const handleRequestPayout = () => {
        // Logic to dispatch payout request would go here
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={'#1C1C1C'} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Request Payout</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Available Balance Card */}
                <Animated.View entering={FadeInDown} style={styles.balanceCard}>
                    <View style={styles.balanceHeader}>
                        <View style={styles.balanceIconContainer}>
                            <Wallet size={24} color={'#2FB050'} />
                        </View>
                        <Text style={styles.balanceLabel}>Available Balance</Text>
                    </View>

                    <View style={styles.balanceAmountRow}>
                        <Text style={styles.balanceCurrency}>₹</Text>
                        <Text style={styles.balanceAmount}>{availableBalance.toLocaleString('en-IN')}</Text>
                    </View>

                    <View style={styles.balanceInfo}>
                        <Info size={14} color={'#2196F3'} />
                        <Text style={styles.balanceInfoText}>
                            Minimum payout amount is ₹{minPayoutAmount}
                        </Text>
                    </View>
                </Animated.View>

                {/* Payout Method Selection */}
                <Animated.View entering={FadeInDown.delay(100)} style={styles.methodCard}>
                    <Text style={styles.sectionTitle}>Choose Payout Method</Text>

                    {/* Daily Payout */}
                    <TouchableOpacity
                        style={[styles.methodOption, selectedMethod === 'daily' && styles.methodOptionActive]}
                        onPress={() => setSelectedMethod('daily')}
                    >
                        <View style={styles.methodLeft}>
                            <View style={[
                                styles.methodRadio,
                                selectedMethod === 'daily' && styles.methodRadioActive
                            ]}>
                                {selectedMethod === 'daily' && (
                                    <View style={styles.methodRadioDot} />
                                )}
                            </View>
                            <View style={styles.methodInfo}>
                                <View style={styles.methodTitleRow}>
                                    <Calendar size={20} color={'#1C1C1C'} />
                                    <Text style={styles.methodTitle}>Daily Auto Payout</Text>
                                    <View style={styles.recommendedBadge}>
                                        <Text style={styles.recommendedText}>Recommended</Text>
                                    </View>
                                </View>
                                <Text style={styles.methodDescription}>
                                    Free • Transfers every day at 6 PM
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Instant Payout */}
                    <TouchableOpacity
                        style={[styles.methodOption, selectedMethod === 'instant' && styles.methodOptionActive]}
                        onPress={() => setSelectedMethod('instant')}
                    >
                        <View style={styles.methodLeft}>
                            <View style={[
                                styles.methodRadio,
                                selectedMethod === 'instant' && styles.methodRadioActive
                            ]}>
                                {selectedMethod === 'instant' && (
                                    <View style={styles.methodRadioDot} />
                                )}
                            </View>
                            <View style={styles.methodInfo}>
                                <View style={styles.methodTitleRow}>
                                    <Zap size={20} color={'#FBC02D'} />
                                    <Text style={styles.methodTitle}>Instant Payout</Text>
                                </View>
                                <Text style={styles.methodDescription}>
                                    ₹{instantPayoutFee} fee • Get money in 15 minutes
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Animated.View>

                {/* Bank Account Card */}
                <Animated.View entering={FadeInDown.delay(200)} style={styles.bankCard}>
                    <View style={styles.bankHeader}>
                        <Text style={styles.sectionTitle}>Bank Account</Text>
                        <TouchableOpacity>
                            <Text style={styles.changeLink}>Change</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bankDetails}>
                        <View style={styles.bankIcon}>
                            <Building2 size={24} color={'#2196F3'} />
                        </View>
                        <View style={styles.bankInfo}>
                            <Text style={styles.bankName}>{bankAccount.bankName}</Text>
                            <Text style={styles.accountHolder}>{bankAccount.holderName}</Text>
                            <Text style={styles.accountNumber}>
                                Account: {bankAccount.accountNumber}
                            </Text>
                            <Text style={styles.ifsc}>IFSC: {bankAccount.ifsc}</Text>
                        </View>
                    </View>

                    <View style={styles.verifiedBadge}>
                        <CheckCircle size={16} color={'#2FB050'} />
                        <Text style={styles.verifiedText}>Verified Account</Text>
                    </View>
                </Animated.View>

                {/* Payout Summary */}
                {selectedMethod === 'instant' && (
                    <Animated.View entering={FadeInDown.delay(300)} style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>Payout Summary</Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Available Balance</Text>
                            <Text style={styles.summaryValue}>₹{availableBalance}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Processing Fee</Text>
                            <Text style={styles.summaryValue}>-₹{instantPayoutFee}</Text>
                        </View>
                        <View style={styles.summaryDivider} />
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabelTotal}>You'll Receive</Text>
                            <Text style={styles.summaryValueTotal}>₹{availableBalance - instantPayoutFee}</Text>
                        </View>
                    </Animated.View>
                )}

                {/* Payout History */}
                <Animated.View entering={FadeInDown.delay(400)} style={styles.historyCard}>
                    <TouchableOpacity
                        style={styles.historyHeader}
                        onPress={() => setShowHistory(!showHistory)}
                    >
                        <Text style={styles.sectionTitle}>Payout History</Text>
                        <ChevronRight
                            size={20}
                            color={'#666'}
                            style={{ transform: [{ rotate: showHistory ? '90deg' : '0deg' }] }}
                        />
                    </TouchableOpacity>

                    {showHistory && (
                        <Animated.View entering={FadeInDown}>
                            {payoutHistory.map((payout) => (
                                <View key={payout.id} style={styles.historyItem}>
                                    <View style={styles.historyLeft}>
                                        <View style={[
                                            styles.historyIcon,
                                            {
                                                backgroundColor: payout.status === 'completed'
                                                    ? '#E8F5E9'
                                                    : '#FFEBEE'
                                            }
                                        ]}>
                                            {payout.status === 'completed' ? (
                                                <CheckCircle size={20} color={'#2FB050'} />
                                            ) : (
                                                <XCircle size={20} color={'#D32F2F'} />
                                            )}
                                        </View>
                                        <View style={styles.historyInfo}>
                                            <Text style={styles.historyAmount}>₹{payout.amount}</Text>
                                            <View style={styles.historyMeta}>
                                                <Text style={styles.historyDate}>{payout.date}</Text>
                                                <Text style={styles.historyDot}>•</Text>
                                                <Text style={styles.historyMethod}>
                                                    {payout.method === 'instant' ? 'Instant' : 'Daily'}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[
                                        styles.statusBadge,
                                        {
                                            backgroundColor: payout.status === 'completed'
                                                ? '#E8F5E9'
                                                : '#FFEBEE'
                                        }
                                    ]}>
                                        <Text style={[
                                            styles.statusText,
                                            {
                                                color: payout.status === 'completed'
                                                    ? '#2FB050'
                                                    : '#D32F2F'
                                            }
                                        ]}>
                                            {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </Animated.View>
                    )}
                </Animated.View>

                {/* Info Banner */}
                <View style={styles.infoBanner}>
                    <Shield size={20} color={'#2196F3'} />
                    <Text style={styles.infoText}>
                        All payouts are secured and encrypted. Your bank details are safe with us.
                    </Text>
                </View>

                {/* Spacer */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Request Button */}
            <View style={styles.bottomAction}>
                <Button
                    variant="primary"
                    size="large"
                    fullWidth
                    disabled={availableBalance < minPayoutAmount}
                    onPress={handleRequestPayout}
                >
                    Request {selectedMethod === 'instant' ? 'Instant' : 'Daily'} Payout
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        backgroundColor: colors.secondary.white,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        ...typography.h3,
        fontSize: 20,
        color: '#1C1C1C',
    },
    scrollContent: {
        padding: spacing.base,
    },
    balanceCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.lg,
        borderWidth: 2,
        borderColor: '#E8F5E9',
    },
    balanceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.base,
    },
    balanceIconContainer: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.lg,
        backgroundColor: '#E8F5E9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    balanceLabel: {
        fontSize: 14,
        color: '#666',
    },
    balanceAmountRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.base,
    },
    balanceCurrency: {
        fontSize: 24,
        color: '#1C1C1C',
        marginTop: 6,
        marginRight: 4,
        fontWeight: '700',
    },
    balanceAmount: {
        fontSize: 42,
        color: '#1C1C1C',
        fontWeight: '700',
    },
    balanceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        backgroundColor: '#E3F2FD',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
    },
    balanceInfoText: {
        fontSize: 12,
        color: '#2196F3',
        flex: 1,
    },
    methodCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.lg,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1C',
        marginBottom: spacing.base,
    },
    methodOption: {
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: borderRadius.lg,
        padding: spacing.base,
        marginBottom: spacing.md,
    },
    methodOptionActive: {
        borderColor: colors.primary.zomato_red,
        backgroundColor: '#FFF0F0',
    },
    methodLeft: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.md,
    },
    methodRadio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    methodRadioActive: {
        borderColor: colors.primary.zomato_red,
    },
    methodRadioDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary.zomato_red,
    },
    methodInfo: {
        flex: 1,
    },
    methodTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.xs,
        flexWrap: 'wrap',
    },
    methodTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1C',
    },
    recommendedBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    recommendedText: {
        fontSize: 10,
        color: '#2FB050',
        fontWeight: '600',
    },
    methodDescription: {
        fontSize: 12,
        color: '#666',
        lineHeight: 18,
    },
    bankCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.lg,
    },
    bankHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.base,
    },
    changeLink: {
        fontSize: 12,
        color: colors.primary.zomato_red,
        fontWeight: '600',
    },
    bankDetails: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.base,
    },
    bankIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.lg,
        backgroundColor: '#E3F2FD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bankInfo: {
        flex: 1,
    },
    bankName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1C',
        marginBottom: 2,
    },
    accountHolder: {
        fontSize: 14,
        color: '#444',
        marginBottom: 2,
    },
    accountNumber: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    ifsc: {
        fontSize: 10,
        color: '#888',
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        backgroundColor: '#E8F5E9',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.lg,
        alignSelf: 'flex-start',
    },
    verifiedText: {
        fontSize: 10,
        color: '#2FB050',
        fontWeight: '600',
    },
    summaryCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.lg,
    },
    summaryTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1C',
        marginBottom: spacing.base,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        color: '#1C1C1C',
        fontWeight: '500',
    },
    summaryDivider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: spacing.md,
    },
    summaryLabelTotal: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1C',
    },
    summaryValueTotal: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    historyCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.lg,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    historyLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        flex: 1,
    },
    historyIcon: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyInfo: {
        flex: 1,
    },
    historyAmount: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1C',
        marginBottom: 2,
    },
    historyMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    historyDate: {
        fontSize: 12,
        color: '#666',
    },
    historyDot: {
        fontSize: 12,
        color: '#DDD',
    },
    historyMethod: {
        fontSize: 12,
        color: '#666',
    },
    statusBadge: {
        paddingHorizontal: spacing.md,
        paddingVertical: 4,
        borderRadius: borderRadius.full,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '600',
    },
    infoBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    infoText: {
        fontSize: 12,
        color: '#2196F3',
        flex: 1,
        lineHeight: 18,
    },
    bottomAction: {
        padding: spacing.base,
        backgroundColor: colors.secondary.white,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        ...shadows.lg,
    },
});
