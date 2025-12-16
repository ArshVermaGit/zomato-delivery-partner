import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { Package, DollarSign, WifiOff, RefreshCw } from 'lucide-react-native';
import { colors, typography, shadows } from '@zomato/design-tokens';
import { Button } from '@zomato/ui';

// Local theme constants
const spacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 24, xl: 32, '2xl': 40 };
const borderRadius = { sm: 4, md: 8, lg: 12, xl: 16, full: 999 };

// Placeholder for Shimmer if not exported from UI
const ShimmerBlock = ({ width, height, style }: { width: number | string, height: number, style?: any }) => (
    <View style={[{ width, height, backgroundColor: '#E0E0E0', borderRadius: 4, opacity: 0.5 }, style]} />
);

export const EmptyStates = {
    NoOrders: () => (
        <View style={styles.emptyContainer}>
            <View style={styles.iconCircle}>
                <Package size={64} color={colors.secondary.gray_400} />
            </View>
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptyText}>Orders will appear here when customers place them</Text>
            <Button onPress={() => { }}>Refresh</Button>
        </View>
    ),

    NoEarnings: () => (
        <View style={styles.emptyContainer}>
            <View style={styles.iconCircle}>
                <DollarSign size={48} color={colors.secondary.gray_400} />
            </View>
            <Text style={styles.emptyTitle}>No Earnings Yet</Text>
            <Text style={styles.emptyText}>Start accepting orders to earn money</Text>
        </View>
    ),

    NoInternet: ({ onRetry }: { onRetry?: () => void }) => (
        <View style={styles.emptyContainer}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFEBEE' }]}>
                <WifiOff size={48} color={colors.primary.zomato_red} />
            </View>
            <Text style={styles.emptyTitle}>No Internet Connection</Text>
            <Text style={styles.emptyText}>Please check your internet and try again</Text>
            {onRetry && <Button onPress={onRetry}>Retry</Button>}
        </View>
    ),
};

export const LoadingStates = {
    ScreenLoader: () => (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.primary.zomato_red} />
            <Text style={styles.loaderText}>Loading...</Text>
        </View>
    ),

    SkeletonCard: () => (
        <View style={styles.skeletonCard}>
            <ShimmerBlock width={60} height={60} style={{ borderRadius: 12 }} />
            <View style={{ flex: 1, gap: spacing.sm }}>
                <ShimmerBlock width="80%" height={20} />
                <ShimmerBlock width="60%" height={16} />
            </View>
        </View>
    ),

    PullToRefresh: ({ refreshing, onRefresh }: { refreshing: boolean, onRefresh: () => void }) => (
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.zomato_red}
            colors={[colors.primary.zomato_red]}
        />
    ),
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing['2xl'],
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1C', // gray_900 equivalent
        marginTop: spacing.xl,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#666', // gray_600 equivalent
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F5F5F5', // gray_100 equivalent
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaderText: {
        marginTop: spacing.md,
        fontSize: 14,
        color: '#666',
    },
    skeletonCard: {
        flexDirection: 'row',
        padding: spacing.base,
        gap: spacing.md,
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        marginBottom: spacing.base,
    },
});
