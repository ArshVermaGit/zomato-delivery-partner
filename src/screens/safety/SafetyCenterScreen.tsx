import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    AlertTriangle,
    MapPin,
    Phone,
    Shield,
    Camera,
    ChevronLeft,
    PhoneCall
} from 'lucide-react-native';
import { colors, typography, shadows } from '@zomato/design-tokens';
import { useNavigation } from '@react-navigation/native';

// Local theme constants
const spacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 24, xl: 32 };
const borderRadius = { sm: 4, md: 8, lg: 12, xl: 16, full: 999 };

// Safety Action Component
const SafetyAction = ({ icon, label, onPress }: { icon: React.ReactNode, label: string, onPress: () => void }) => (
    <TouchableOpacity style={styles.safetyAction} onPress={onPress}>
        <View style={styles.safetyIconContainer}>
            {icon}
        </View>
        <Text style={styles.safetyActionLabel}>{label}</Text>
    </TouchableOpacity>
);

// Contact Item Component
const ContactItem = ({ contact }: { contact: { id: string, name: string, phone: string, relation: string } }) => (
    <View style={styles.contactItem}>
        <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactRelation}>{contact.relation}</Text>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
        </View>
        <TouchableOpacity style={styles.contactCallButton}>
            <PhoneCall size={20} color={colors.secondary.white} />
        </TouchableOpacity>
    </View>
);

// Safety Tip Component
const TipItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <View style={styles.tipItem}>
        <View style={styles.tipIcon}>{icon}</View>
        <Text style={styles.tipText}>{text}</Text>
    </View>
);

export const SafetyCenterScreen = () => {
    const navigation = useNavigation();
    const [emergencyContacts, setEmergencyContacts] = useState([
        { id: '1', name: 'Priya Kumar', phone: '+91 98765 43211', relation: 'Wife' },
    ]);

    const handleSOS = () => {
        Alert.alert('SOS Triggered', 'Sending emergency alert to contacts and support team...');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={'#1C1C1C'} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Safety Center</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* SOS Button */}
                <View style={styles.sosContainer}>
                    <TouchableOpacity
                        style={styles.sosButton}
                        onLongPress={handleSOS}
                        delayLongPress={1000}
                        activeOpacity={0.9}
                    >
                        <View style={styles.sosRipple} />
                        <View style={styles.sosInner}>
                            <AlertTriangle size={48} color={colors.secondary.white} />
                            <Text style={styles.sosText}>SOS</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.sosHint}>Long press for 1 second to trigger SOS</Text>
                </View>

                {/* Quick Actions */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActionsGrid}>
                        <SafetyAction
                            icon={<MapPin size={24} color={'#2196F3'} />}
                            label="Share Live Location"
                            onPress={() => { }}
                        />
                        <SafetyAction
                            icon={<Phone size={24} color={'#2FB050'} />}
                            label="Emergency Call"
                            onPress={() => { }}
                        />
                        <SafetyAction
                            icon={<Shield size={24} color={'#FBC02D'} />}
                            label="Report Issue"
                            onPress={() => { }}
                        />
                        <SafetyAction
                            icon={<Camera size={24} color={colors.primary.zomato_red} />}
                            label="Report Accident"
                            onPress={() => (navigation as any).navigate('AccidentReport')}
                        />
                    </View>
                </View>

                {/* Emergency Contacts */}
                <View style={styles.contactsCard}>
                    <View style={styles.contactsHeader}>
                        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
                        <TouchableOpacity>
                            <Text style={styles.addLink}>+ Add</Text>
                        </TouchableOpacity>
                    </View>
                    {emergencyContacts.map(contact => (
                        <ContactItem key={contact.id} contact={contact} />
                    ))}
                </View>

                {/* Safety Tips */}
                <View style={styles.tipsCard}>
                    <Text style={styles.sectionTitle}>Safety Tips</Text>
                    <TipItem
                        icon={<Shield size={20} color={'#2196F3'} />}
                        text="Always wear your helmet and safety gear"
                    />
                    <TipItem
                        icon={<AlertTriangle size={20} color={'#FBC02D'} />}
                        text="Follow traffic rules at all times"
                    />
                    <TipItem
                        icon={<Phone size={20} color={'#2FB050'} />}
                        text="Keep your phone charged"
                    />
                </View>

                {/* Insurance Info */}
                <View style={styles.insuranceCard}>
                    <View style={styles.insuranceHeader}>
                        <Shield size={24} color={'#2196F3'} />
                        <Text style={styles.insuranceTitle}>Insurance Coverage</Text>
                    </View>
                    <Text style={styles.insuranceText}>You are covered with accident insurance up to ₹5,00,000</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewDetailsLink}>View Details →</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
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
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    scrollContent: {
        padding: spacing.base,
    },
    sosContainer: {
        alignItems: 'center',
        marginVertical: spacing.lg,
    },
    sosButton: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: colors.primary.zomato_red,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.xl,
        position: 'relative',
    },
    sosRipple: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: colors.primary.zomato_red,
        opacity: 0.15,
    },
    sosInner: {
        alignItems: 'center',
        gap: spacing.xs,
    },
    sosText: {
        fontSize: 24,
        color: colors.secondary.white,
        fontWeight: '800',
        letterSpacing: 2,
    },
    sosHint: {
        marginTop: spacing.md,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    sectionContainer: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: spacing.md,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    safetyAction: {
        width: '47%',
        backgroundColor: colors.secondary.white,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        gap: spacing.sm,
        ...shadows.sm,
    },
    safetyIconContainer: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.full,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    safetyActionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1C',
    },
    contactsCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.lg,
        ...shadows.sm,
    },
    contactsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    addLink: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primary.zomato_red,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1C',
    },
    contactRelation: {
        fontSize: 12,
        color: '#888',
        marginBottom: 2,
    },
    contactPhone: {
        fontSize: 14,
        color: '#666',
    },
    contactCallButton: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: '#2FB050',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tipsCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.lg,
        ...shadows.sm,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        marginBottom: spacing.md,
    },
    tipIcon: {
        width: 32,
        alignItems: 'center',
    },
    tipText: {
        fontSize: 14,
        color: '#444',
        flex: 1,
    },
    insuranceCard: {
        backgroundColor: '#E3F2FD', // Info Light
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.lg,
    },
    insuranceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    insuranceTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    insuranceText: {
        fontSize: 14,
        color: '#444',
        marginBottom: spacing.md,
        lineHeight: 20,
    },
    viewDetailsLink: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2196F3',
    },
});
