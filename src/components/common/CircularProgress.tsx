import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors } from '@zomato/design-tokens';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
    value: number;
    max: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    backgroundColor?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
    max,
    size = 60,
    strokeWidth = 6,
    color = colors.primary.zomato_red,
    backgroundColor = colors.secondary.gray_200,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(value / max, { duration: 1000 });
    }, [value, max]);

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: circumference * (1 - progress.value),
        };
    });

    return (
        <View style={{ width: size, height: size }}>
            <Svg width={size} height={size}>
                {/* Background Circle */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />

                {/* Progress Circle */}
                <AnimatedCircle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    animatedProps={animatedProps}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${size / 2}, ${size / 2}`}
                />
            </Svg>
        </View>
    );
};
