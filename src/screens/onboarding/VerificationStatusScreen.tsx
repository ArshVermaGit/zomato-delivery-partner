import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { Clock, CheckCircle, XCircle, Check, X } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '@/theme';

export const VerificationStatusScreen = () => {
    const navigation = useNavigation<any>();
    const [status] = useState<'pending' | 'approved' | 'rejected'>('pending');

    const documents = [
        { key: 'doc1', name: 'Profile Photo', status: 'approved' },
        { key: 'doc2', name: 'Driver\'s License', status: 'approved' },
        { key: 'doc3', name: 'Aadhaar Card', status: 'approved' },
        { key: 'doc4', name: 'Vehicle RC', status: 'approved' },
        { key: 'doc5', name: 'Bank Proof', status: 'approved' },
    ];

    const statusConfig = {
        pending: {
            icon: <Clock size={64} color={colors.semantic.warning} />,
            color: colors.semantic.warning,
            bgColor: colors.semantic.warning_light,
            title: 'Verification in Progress',
            description: "We're reviewing your documents. This usually takes 24-48 hours.",
        },
        approved: {
            icon: <CheckCircle size={64} color={colors.semantic.success} />,
            color: colors.semantic.success,
            bgColor: colors.semantic.success_light,
            title: 'Verification Approved!',
            description: 'Congratulations! You can now start accepting orders and earning.',
        },
        rejected: {
            icon: <XCircle size={64} color={colors.semantic.error} />,
            color: colors.semantic.error,
            bgColor: colors.semantic.error_light,
            title: 'Verification Rejected',
            description: 'Some documents need to be re-uploaded. Please check the details below.',
        },
    };

    const config = statusConfig[status];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Status Icon */}
                <Animated.View
                    entering={ZoomIn.duration(400)}
                    style={[styles.iconContainer, { backgroundColor: config.bgColor }]}
                >
                    {config.icon}
                </Animated.View>

                {/* Title & Description */}
                <Text style={styles.title}>{config.title}</Text>
                <Text style={styles.description}>{config.description}</Text>

                {/* Document Status List */}
                <View style={styles.documentsList}>
                    {documents.map((doc) => (
                        <View key={doc.key} style={styles.documentStatusItem}>
                            <View style={styles.documentStatusLeft}>
                                <View style={[
                                    styles.statusIcon,
                                    { backgroundColor: doc.status === 'approved' ? colors.semantic.success_light : colors.semantic.error_light }
                                ]}>
                                    {doc.status === 'approved' ? (
                                        <Check size={16} color={colors.semantic.success} />
                                    ) : (
                                        <X size={16} color={colors.semantic.error} />
                                    )}
                                </View>
                                <Text style={styles.documentName}>{doc.name}</Text>
                            </View>
                            {/* Logic for individual doc re-upload if needed, based on status='rejected' */}
                        </View>
                    ))}
                </View>

                {/* Action Button */}
                {status === 'approved' && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Main')}
                    >
                        <Text style={styles.buttonText}>Start Earning Now</Text>
                    </TouchableOpacity>
                )}

                {status === 'rejected' && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('DocumentUpload')}
                    >
                        <Text style={styles.buttonText}>Re-upload Documents</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary.white,
    },
    content: {
        padding: spacing['2xl'],
        alignItems: 'center',
        paddingTop: spacing['5xl'],
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xl,
    },
    title: {
        ...typography.h2,
        color: colors.secondary.gray_900,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    description: {
        ...typography.body_large,
        color: colors.secondary.gray_600,
        textAlign: 'center',
        marginBottom: spacing['2xl'],
        lineHeight: 24,
    },
    documentsList: {
        width: '100%',
        backgroundColor: colors.secondary.gray_50,
        borderRadius: borderRadius.lg,
        padding: spacing.base,
        marginBottom: spacing['2xl'],
    },
    documentStatusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary.gray_200,
    },
    documentStatusLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    statusIcon: {
        width: 24,
        height: 24,
        borderRadius: borderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    documentName: {
        ...typography.body_medium,
        color: colors.secondary.gray_800,
        fontWeight: '500',
    },
    button: {
        backgroundColor: colors.primary.zomato_red,
        width: '100%',
        height: 48,
        borderRadius: borderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.secondary.white,
        fontSize: 16,
        fontWeight: '600',
    }
});

export default VerificationStatusScreen;
