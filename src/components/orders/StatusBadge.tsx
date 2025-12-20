import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography } from '@zomato/design-tokens';

interface StatusBadgeProps {
    status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getStatusStyle = (badgeStatus: string) => {
        const s = badgeStatus.toLowerCase();

        // Delivered / Completed
        if (s === 'delivered' || s === 'completed') {
            return {
                container: styles.statusSuccess,
                text: styles.textSuccess
            };
        }

        // Active / Ongoing
        if (s === 'active' || s === 'picked up' || s === 'on the way') {
            return {
                container: styles.statusActive,
                text: styles.textActive
            };
        }

        // Available / Pending
        if (s === 'available' || s === 'pending') {
            return {
                container: styles.statusAvailable,
                text: styles.textAvailable
            };
        }

        // Default
        return {
            container: styles.statusDefault,
            text: styles.textDefault
        };
    };

    const style = getStatusStyle(status);

    return (
        <View style={[styles.statusBadge, style.container]}>
            <Text style={[styles.statusText, style.text]}>
                {status.toUpperCase()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statusText: {
        ...typography.caption,
        fontSize: 10,
        fontWeight: '700',
    },

    // Styles
    statusSuccess: {
        backgroundColor: '#E8F5E9',
    },
    textSuccess: {
        color: '#2FB050',
    },

    statusActive: {
        backgroundColor: '#E3F2FD',
    },
    textActive: {
        color: '#2196F3',
    },

    statusAvailable: {
        backgroundColor: '#FFF3E0',
    },
    textAvailable: {
        color: '#EF6C00',
    },

    statusDefault: {
        backgroundColor: '#F5F5F5',
    },
    textDefault: {
        color: '#666',
    }
});
