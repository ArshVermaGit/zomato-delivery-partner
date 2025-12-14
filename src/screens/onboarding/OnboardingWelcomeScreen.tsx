import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle } from 'lucide-react-native';

const OnboardingWelcomeScreen = () => {
    const navigation = useNavigation<any>();

    const benefits = [
        "Flexible Working Hours",
        "Instant Payouts",
        "Insurance Coverage",
        "Joining Bonus up to ₹5000",
        "Electric Vehicle Rental Options"
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome to Zomato</Text>
                    <Text style={styles.subtitle}>Start your journey as a delivery partner today!</Text>
                </View>

                <View style={styles.benefitsContainer}>
                    <Text style={styles.sectionTitle}>Why join us?</Text>
                    {benefits.map((benefit, index) => (
                        <View key={index} style={styles.benefitItem}>
                            <CheckCircle size={20} color="#2196F3" />
                            <Text style={styles.benefitText}>{benefit}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('DocumentUpload')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    content: {
        padding: 24,
    },
    header: {
        marginBottom: 40,
        marginTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1C1C1C',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    benefitsContainer: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    benefitText: {
        fontSize: 15,
        color: '#444',
        marginLeft: 12,
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    button: {
        backgroundColor: '#E23744',
        height: 52,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default OnboardingWelcomeScreen;
