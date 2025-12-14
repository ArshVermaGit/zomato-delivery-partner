import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, List, User } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomTabNav = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();

    const tabs = [
        { name: 'Home', icon: Home, routeName: 'Home' },
        { name: 'Orders', icon: List, routeName: 'OrdersList' },
        { name: 'Profile', icon: User, routeName: 'Profile' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab, index) => {
                const isActive = route.name === tab.routeName;
                return (
                    <TouchableOpacity
                        key={index}
                        style={styles.tab}
                        onPress={() => navigation.navigate(tab.routeName)}
                    >
                        <tab.icon size={24} color={isActive ? '#E23744' : '#888'} />
                        <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.name}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingVertical: 8,
        paddingBottom: 24, // Safe area
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 10,
        color: '#888',
        marginTop: 4,
    },
    activeLabel: {
        color: '#E23744',
        fontWeight: '600',
    }
});

export default BottomTabNav;
