import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSequence,
    withSpring,
    withTiming,
    interpolate
} from 'react-native-reanimated';
import { Bike } from 'lucide-react-native';
import { colors, spacing, typography } from '@/theme';

interface DeliverySplashScreenProps {
    onFinish: () => void;
}

export const DeliverySplashScreen: React.FC<DeliverySplashScreenProps> = ({ onFinish }) => {
    const logoScale = useSharedValue(0);
    const logoOpacity = useSharedValue(0);
    const bikeTranslateX = useSharedValue(-100);

    useEffect(() => {
        // Logo animation
        logoScale.value = withSequence(
            withSpring(1.2, { damping: 10 }),
            withSpring(1, { damping: 15 })
        );
        logoOpacity.value = withTiming(1, { duration: 400 });

        // Bike animation
        bikeTranslateX.value = withSpring(0, { damping: 15 });

        const timer = setTimeout(onFinish, 2500);
        return () => clearTimeout(timer);
    }, []);

    const logoStyle = useAnimatedStyle(() => ({
        transform: [{ scale: logoScale.value }],
        opacity: logoOpacity.value,
    }));

    const bikeStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: bikeTranslateX.value }],
    }));

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Animated.View style={[styles.logoContainer, logoStyle]}>
                <View style={styles.logoCircle}>
                    <Animated.View style={bikeStyle}>
                        <Bike size={48} color={colors.secondary.white} strokeWidth={2.5} />
                    </Animated.View>
                </View>
                <Text style={styles.appName}>Zomato Delivery Partner</Text>
                <Text style={styles.tagline}>Start Earning Today</Text>
            </Animated.View>

            {/* Bottom Text */}
            <Text style={styles.bottomText}>
                Flexible hours • Instant payouts • No boss
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary.zomato_red,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xl,
    },
    appName: {
        ...typography.display_medium,
        color: colors.secondary.white,
        fontWeight: '700',
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    tagline: {
        ...typography.body_large,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
    },
    bottomText: {
        position: 'absolute',
        bottom: spacing['3xl'],
        ...typography.body_medium,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
});
