import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../store/slices/authSlice';
import BottomTabNav from '../../components/navigation/BottomTabNav';
import ProfileMenuItem from '../../components/profile/ProfileMenuItem';
import {
    User, Truck, FileText, CreditCard,
    Settings, HelpCircle, LogOut, ShieldCheck
} from 'lucide-react-native';

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { stats } = useSelector((state: RootState) => state.delivery);

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(logout());
                        // Navigation reset should happen automatically in RootNavigator due to user=null
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </SafeAreaView>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileTop}>
                        {user?.photo ? (
                            <Image source={{ uri: user.photo }} style={styles.avatar} />
                        ) : (
                            <View style={[styles.avatar, styles.avatarPlaceholder]}>
                                <Text style={styles.avatarInitials}>{user?.name?.charAt(0) || 'U'}</Text>
                            </View>
                        )}
                        <View style={styles.profileInfo}>
                            <Text style={styles.name}>{user?.name || 'Delivery Partner'}</Text>
                            <Text style={styles.id}>ID: {user?.id || 'DP-0000'}</Text>
                            <View style={styles.verifiedBadge}>
                                <ShieldCheck size={12} color="#FFF" />
                                <Text style={styles.verifiedText}>Verified Partner</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{stats.rating}</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{stats.deliveries}</Text>
                            <Text style={styles.statLabel}>Deliveries</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>2.5y</Text>
                            <Text style={styles.statLabel}>With Zomato</Text>
                        </View>
                    </View>
                </View>

                {/* Menu */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <ProfileMenuItem
                        icon={User}
                        label="My Details"
                        onPress={() => navigation.navigate('MyDetails')}
                    />
                    <ProfileMenuItem
                        icon={Truck}
                        label="Vehicle Details"
                        onPress={() => navigation.navigate('VehicleDetails')}
                    />
                    <ProfileMenuItem
                        icon={FileText}
                        label="Documents"
                        onPress={() => navigation.navigate('Documents')}
                    />
                    <ProfileMenuItem
                        icon={CreditCard}
                        label="Bank Details"
                        onPress={() => { }}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App</Text>
                    <ProfileMenuItem
                        icon={Settings}
                        label="Settings"
                        onPress={() => { }}
                    />
                    <ProfileMenuItem
                        icon={HelpCircle}
                        label="Help & Support"
                        onPress={() => navigation.navigate('HelpSupport')}
                    />
                    <ProfileMenuItem
                        icon={LogOut}
                        label="Logout"
                        color="#E23744"
                        showChevron={false}
                        onPress={handleLogout}
                    />
                </View>

                <Text style={styles.version}>Version 2.4.1</Text>

            </ScrollView>

            <BottomTabNav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#FFF',
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    content: {
        padding: 16,
    },
    profileCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        elevation: 2,
    },
    profileTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    avatarPlaceholder: {
        backgroundColor: '#E23744',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitials: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFF',
    },
    profileInfo: {
        marginLeft: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    id: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2FB050',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    verifiedText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '700',
        marginLeft: 4,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 12,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1C',
    },
    statLabel: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: '#DDD',
    },
    section: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#888',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    version: {
        textAlign: 'center',
        color: '#CCC',
        fontSize: 12,
        marginBottom: 32,
    }
});

export default ProfileScreen;
