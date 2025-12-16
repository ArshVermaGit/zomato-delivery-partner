import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    useAnimatedScrollHandler,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, DollarSign, Shield, ChevronRight, Briefcase } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '@/theme';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AnimatedDot = ({ index, scrollX }: { index: number, scrollX: Animated.SharedValue<number> }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];
        const width = interpolate(
            scrollX.value,
            inputRange,
            [8, 20, 8],
            Extrapolate.CLAMP
        );
        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.5, 1, 0.5],
            Extrapolate.CLAMP
        );
        return {
            width,
            opacity,
        };
    });

    return (
        <Animated.View style={[styles.dot, animatedStyle, { backgroundColor: colors.primary.zomato_red }]} />
    );
};

export const DeliveryOnboardingScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const navigation = useNavigation<any>();

    const slides = [
        {
            id: 1,
            title: 'Be Your Own Boss',
            description: 'Work on your own schedule. Earn more by working during peak hours',
            // illustration: require('@/assets/delivery_onboard1.png'), // Placeholder
            color: '#FFE5E5',
            icon: <Clock size={32} color={colors.primary.zomato_red} />,
            IllustratorIcon: <Briefcase size={120} color={colors.primary.zomato_red} />
        },
        {
            id: 2,
            title: 'Earn More Money',
            description: 'Get instant payouts, bonuses, and incentives for completing deliveries',
            // illustration: require('@/assets/delivery_onboard2.png'),
            color: '#E8F8E8',
            icon: <DollarSign size={32} color={colors.semantic.success} />,
            IllustratorIcon: <DollarSign size={120} color={colors.semantic.success} />
        },
        {
            id: 3,
            title: 'Stay Safe',
            description: 'Insurance coverage, 24/7 support, and SOS features for your safety',
            // illustration: require('@/assets/delivery_onboard3.png'),
            color: '#E5F0FF',
            icon: <Shield size={32} color={colors.semantic.info} />,
            IllustratorIcon: <Shield size={120} color={colors.semantic.info} />
        },
    ];

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
        onMomentumEnd: (event) => {
            // Update index for button logic (rough approximation)
            // In precise impl, use ref or state updaters
        }
    });

    // Manual scroll listener update Since onMomentumEnd in worklet might not update state immediately/easily without runOnJS
    const onMomentumScrollEnd = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        setCurrentIndex(index);
    }

    const handleSkip = () => {
        navigation.navigate('DocumentUpload');
    };

    const handleGetStarted = () => {
        navigation.navigate('DocumentUpload');
    };

    const scrollToNext = () => {
        // In a real implementation with ref to ScrollView, scroll to next
        // keeping it simple for now, user manually swipes or we need ref
        // For this task, assuming user swipes. If button needed, must add Ref.
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Skip Button */}
            {currentIndex < slides.length - 1 && (
                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            )}

            {/* Slides */}
            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                onMomentumScrollEnd={onMomentumScrollEnd}
                scrollEventThrottle={16}
            >
                {slides.map((slide, index) => (
                    <View key={slide.id} style={styles.slide}>
                        {/* Icon Badge */}
                        <View style={[styles.iconBadge, { backgroundColor: slide.color }]}>
                            {slide.icon}
                        </View>

                        {/* Illustration Placeholder since images missing */}
                        <View style={styles.illustrationContainer}>
                            {slide.IllustratorIcon}
                        </View>

                        {/* Content */}
                        <View style={styles.content}>
                            <Text style={styles.title}>{slide.title}</Text>
                            <Text style={styles.description}>{slide.description}</Text>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>

            {/* Pagination */}
            <View style={styles.pagination}>
                {slides.map((_, index) => (
                    <AnimatedDot key={index} index={index} scrollX={scrollX} />
                ))}
            </View>

            {/* Bottom Action */}
            <View style={styles.bottomAction}>
                {currentIndex < slides.length - 1 ? (
                    // Placeholder for Next button functionality - visually present
                    <View style={{ opacity: 0.5 }}>
                        {/* Using a simplified indicator or just text instructing swipe */}
                        <Text style={{ textAlign: 'center', color: colors.secondary.gray_500 }}>Swipe to learn more</Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleGetStarted}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary.white,
    },
    skipButton: {
        position: 'absolute',
        top: spacing.lg + 40,
        right: spacing.base,
        zIndex: 10,
        padding: spacing.sm,
    },
    skipText: {
        ...typography.label_medium,
        color: colors.secondary.gray_600,
    },
    slide: {
        width: SCREEN_WIDTH,
        flex: 1,
        alignItems: 'center',
        paddingTop: spacing['5xl'],
        paddingHorizontal: spacing.xl,
    },
    iconBadge: {
        width: 80,
        height: 80,
        borderRadius: borderRadius['2xl'],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xl,
    },
    illustrationContainer: {
        width: SCREEN_WIDTH * 0.7,
        height: SCREEN_WIDTH * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing['2xl'],
        backgroundColor: colors.secondary.gray_50, // placeholder bg
        borderRadius: 20,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        ...typography.display_medium,
        color: colors.secondary.gray_900,
        textAlign: 'center',
        marginBottom: spacing.base,
    },
    description: {
        ...typography.body_large,
        color: colors.secondary.gray_600,
        textAlign: 'center',
        lineHeight: 24,
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        marginBottom: spacing.xl,
    },
    bottomAction: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xl,
        minHeight: 80, // reserve space
        justifyContent: 'center',
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    button: {
        backgroundColor: colors.primary.zomato_red,
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
