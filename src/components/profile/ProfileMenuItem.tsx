import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface Props {
    icon: any;
    label: string;
    onPress: () => void;
    color?: string;
    showChevron?: boolean;
}

const ProfileMenuItem: React.FC<Props> = ({ icon: Icon, label, onPress, color = '#333', showChevron = true }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.left}>
                <View style={[styles.iconBg, { backgroundColor: color + '15' }]}>
                    <Icon size={20} color={color} />
                </View>
                <Text style={[styles.label, { color }]}>{label}</Text>
            </View>
            {showChevron && <ChevronRight size={20} color="#CCC" />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBg: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    }
});

export default ProfileMenuItem;
