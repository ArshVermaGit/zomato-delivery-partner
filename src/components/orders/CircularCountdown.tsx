import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircularCountdownProps {
    duration: number; // in seconds
    onComplete: () => void;
    radius?: number;
    strokeWidth?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularCountdown: React.FC<CircularCountdownProps> = ({
    duration,
    onComplete,
    radius = 40,
    strokeWidth = 4,
}) => {
    // Use React Native Animated API for simplicity over reanimated for this specific ring
    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const circumference = 2 * Math.PI * radius;

    // Colors
    const COLOR_GREEN = '#4CAF50';
    const COLOR_YELLOW = '#FFC107';
    const COLOR_RED = '#F44336';

    const [color, setColor] = React.useState(COLOR_GREEN);

    useEffect(() => {
        // Start animation
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: duration * 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (finished) {
                onComplete();
            }
        });

        // Color interval
        const interval = setInterval(() => {
            // @ts-ignore
            const progress = animatedValue.__getValue();
            const remaining = duration * (1 - progress);

            if (remaining <= 10) {
                setColor(COLOR_RED);
            } else if (remaining <= 20) {
                setColor(COLOR_YELLOW);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [animatedValue, duration, onComplete]);

    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -circumference], // Clockwise reduce
    });

    return (
        <View style={styles.container}>
            <Svg width={(radius + strokeWidth) * 2} height={(radius + strokeWidth) * 2}>
                <Circle
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    r={radius}
                    stroke="#EEE"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <AnimatedCircle
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CircularCountdown;
