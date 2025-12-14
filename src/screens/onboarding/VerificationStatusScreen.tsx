import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, HelpCircle, FileText, Smartphone } from 'lucide-react-native';

const VerificationStatusScreen = () => {
    // In a real app, this screen would poll status or listen to push notifications
    const steps = [
        { icon: FileText, title: 'Documents Uploaded', status: 'done' },
        { icon: Smartphone, title: 'Background Check', status: 'in_progress' },
        { icon: Clock, title: 'Account Activation', status: 'pending' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.centerContent}>
                <View style={styles.statusIcon}>
                    <Clock size={48} color="#FF9800" />
                </View>

                <Text style={styles.title}>Verification in Progress</Text>
                <Text style={styles.subtitle}>
                    Thanks for submitting your details. verification usually takes 24-48 hours.
                </Text>

                <View style={styles.stepsContainer}>
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isDone = step.status === 'done';
                        const isInProgress = step.status === 'in_progress';

                        return (
                            <View key={index} style={styles.stepItem}>
                                <View style={[
                                    styles.stepIcon,
                                    isDone && styles.stepIconDone,
                                    isInProgress && styles.stepIconProgress
                                ]}>
                                    <Icon size={20} color={isDone ? '#FFF' : (isInProgress ? '#FF9800' : '#CCC')} />
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>{step.title}</Text>
                                    <Text style={styles.stepStatus}>
                                        {isDone ? 'Completed' : (isInProgress ? 'In Progress' : 'Pending')}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>We will notify you via SMS once approved.</Text>
                <TouchableOpacity style={styles.helpButton}>
                    <HelpCircle size={20} color="#E23744" />
                    <Text style={styles.helpText}>Need Help?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    centerContent: {
        flex: 1,
        padding: 32,
        alignItems: 'center',
    },
    statusIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1C',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
    },
    stepsContainer: {
        width: '100%',
    },
    stepItem: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    stepIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    stepIconDone: {
        backgroundColor: '#4CAF50',
    },
    stepIconProgress: {
        backgroundColor: '#FFF3E0',
        borderWidth: 1,
        borderColor: '#FF9800',
    },
    stepContent: {
        flex: 1,
        justifyContent: 'center',
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    stepStatus: {
        fontSize: 14,
        color: '#888',
        marginTop: 2,
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    helpButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    helpText: {
        color: '#E23744',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default VerificationStatusScreen;
