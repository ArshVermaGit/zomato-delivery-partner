import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Camera,
    CheckCircle,
    User,
    Bike,
    CreditCard,
    FileText,
    Clock,
    MapPin,
    Bell,
    HelpCircle,
    Shield,
    BookOpen,
    MessageSquare,
    LogOut,
    ChevronRight
} from 'lucide-react-native';
import { colors, shadows } from '@/theme';

// Local theme constants
const spacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 24, xl: 32 };
const borderRadius = { sm: 4, md: 8, lg: 12, xl: 16, full: 999 };

// Menu Item Component
const MenuItem = ({ icon, label, badge, badgeColor = 'success', onPress }: {
    icon: React.ReactNode,
    label: string,
    badge?: string,
    badgeColor?: 'success' | 'warning' | 'error' | 'info',
    onPress: () => void
}) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuItemLeft}>
            <View style={styles.menuIcon}>{icon}</View>
            <Text style={styles.menuLabel}>{label}</Text>
        </View>
        <View style={styles.menuItemRight}>
            {badge && (
                <View style={[styles.badge, { backgroundColor: badgeColor === 'warning' ? '#FFF3E0' : '#E8F5E9' }]}>
                    <Text style={[styles.badgeText, { color: badgeColor === 'warning' ? '#F57C00' : '#2FB050' }]}>{badge}</Text>
                </View>
            )}
            <ChevronRight size={20} color={'#BDBDBD'} />
        </View>
    </TouchableOpacity>
);

export const ProfileScreen = () => {
    // Placeholder image
    const profileImage = 'https://i.pravatar.cc/300';

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <TouchableOpacity style={styles.avatarContainer}>
                        <Image source={{ uri: profileImage }} style={styles.avatar} />
                        <View style={styles.editBadge}>
                            <Camera size={16} color={colors.secondary.white} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.name}>Rajesh Kumar</Text>
                    <Text style={styles.phone}>+91 98765 43210</Text>
                    <View style={styles.statusBadge}>
                        <CheckCircle size={14} color={'#2FB050'} />
                        <Text style={styles.statusText}>Verified Partner</Text>
                    </View>
                </View>

                {/* Menu Sections */}
                <View style={styles.menuSection}>
                    <Text style={styles.menuSectionTitle}>Account</Text>
                    <MenuItem icon={<User size={20} color="#1C1C1C" />} label="Personal Details" onPress={() => { }} />
                    <MenuItem icon={<Bike size={20} color="#1C1C1C" />} label="Vehicle Details" badge="Verified" onPress={() => { }} />
                    <MenuItem icon={<CreditCard size={20} color="#1C1C1C" />} label="Bank Details" onPress={() => { }} />
                    <MenuItem icon={<FileText size={20} color="#1C1C1C" />} label="Documents" badge="2 Pending" badgeColor="warning" onPress={() => { }} />
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.menuSectionTitle}>Preferences</Text>
                    <MenuItem icon={<Clock size={20} color="#1C1C1C" />} label="Working Hours" onPress={() => { }} />
                    <MenuItem icon={<MapPin size={20} color="#1C1C1C" />} label="Preferred Zones" onPress={() => { }} />
                    <MenuItem icon={<Bell size={20} color="#1C1C1C" />} label="Notifications" onPress={() => { }} />
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.menuSectionTitle}>Support</Text>
                    <MenuItem icon={<HelpCircle size={20} color="#1C1C1C" />} label="Help Center" onPress={() => { }} />
                    <MenuItem icon={<Shield size={20} color="#1C1C1C" />} label="Safety" onPress={() => { }} />
                    <MenuItem icon={<BookOpen size={20} color="#1C1C1C" />} label="Training Videos" onPress={() => { }} />
                    <MenuItem icon={<MessageSquare size={20} color="#1C1C1C" />} label="Contact Support" onPress={() => { }} />
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <LogOut size={20} color={colors.primary.zomato_red} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

// Default export for TabNavigator
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollContent: {

    },
    profileHeader: {
        alignItems: 'center',
        backgroundColor: colors.secondary.white,
        paddingVertical: spacing.xl,
        marginBottom: spacing.base,
        ...shadows.sm,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: spacing.md,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: colors.secondary.white,
        ...shadows.sm,
    },
    editBadge: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: colors.primary.zomato_red,
        padding: 6,
        borderRadius: borderRadius.full,
        borderWidth: 2,
        borderColor: colors.secondary.white,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: 4,
    },
    phone: {
        fontSize: 14,
        color: '#666',
        marginBottom: spacing.sm,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#E8F5E9', // Success Light
        paddingHorizontal: spacing.md,
        paddingVertical: 4,
        borderRadius: borderRadius.full,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2FB050', // Success
    },
    menuSection: {
        backgroundColor: colors.secondary.white,
        marginBottom: spacing.base,
        paddingVertical: spacing.sm,
        ...shadows.sm,
    },
    menuSectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
        marginLeft: spacing.base,
        marginBottom: spacing.sm,
        marginTop: spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.base,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    menuIcon: {
        width: 32,
        alignItems: 'center',
    },
    menuLabel: {
        fontSize: 16,
        color: '#1C1C1C',
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        backgroundColor: '#FFF0F0', // Red Tint
        marginHorizontal: spacing.base,
        marginVertical: spacing.base,
        padding: spacing.base,
        borderRadius: borderRadius.lg,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary.zomato_red,
    },
});
