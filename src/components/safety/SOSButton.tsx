import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AlertTriangle } from 'lucide-react-native';

const SOSButton = () => {
    const navigation = useNavigation<any>();

    const handlePress = () => {
        // In reality, this should be long press or confirmed
        navigation.navigate('SOSScreen');
    };

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onLongPress={handlePress}
            delayLongPress={1000}
            onPress={() => Alert.alert('Hold for SOS', 'Press and hold for 1 second to trigger SOS')}
        >
            <View style={styles.circle}>
                <AlertTriangle size={48} color="#FFF" fill="#FFF" />
                <Text style={styles.text}>SOS</Text>
            </View>
            <Text style={styles.hint}>Long press for help</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 24,
    },
    circle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#E23744',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#E23744',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderWidth: 8,
        borderColor: '#FFEBEE',
    },
    text: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '900',
        marginTop: 4,
    },
    hint: {
        marginTop: 12,
        color: '#666',
        fontSize: 12,
    }
});

export default SOSButton;
