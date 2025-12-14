import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react-native';

const DocumentsScreen = () => {
    const { profile } = useSelector((state: RootState) => state.delivery);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'VERIFIED': return <CheckCircle size={20} color="#2FB050" />;
            case 'EXPIRED': return <XCircle size={20} color="#E23744" />;
            case 'PENDING': return <AlertCircle size={20} color="#FF9800" />;
            default: return <AlertCircle size={20} color="#888" />;
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={profile.documents}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.iconBox}>
                            <FileIcon />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.expiry}>{item.expiry ? `Expires: ${item.expiry}` : 'No expiry'}</Text>
                        </View>
                        <View style={styles.status}>
                            {getStatusIcon(item.status)}
                            <Text style={[styles.statusText, {
                                color: item.status === 'VERIFIED' ? '#2FB050' :
                                    item.status === 'EXPIRED' ? '#E23744' : '#FF9800'
                            }]}>{item.status}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

// Simple visual components
const FileIcon = () => (
    <View style={{ width: 16, height: 20, borderWidth: 2, borderColor: '#666', borderRadius: 2 }} />
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    expiry: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    status: {
        alignItems: 'flex-end',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
        marginTop: 2,
    }
});

export default DocumentsScreen;
