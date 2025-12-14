import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Camera, Check, AlertCircle, Trash2 } from 'lucide-react-native';
import DocumentCamera from '../../components/DocumentCamera';

interface Document {
    id: string;
    name: string;
    description: string;
    status: 'pending' | 'uploaded' | 'verified' | 'rejected';
    uri?: string;
}

const REQUIRED_DOCUMENTS: Document[] = [
    { id: 'profile', name: 'Profile Photo', description: 'Clear selfie with neutral background', status: 'pending' },
    { id: 'license_front', name: 'Driver\'s License (Front)', description: 'Front side of your driving license', status: 'pending' },
    { id: 'license_back', name: 'Driver\'s License (Back)', description: 'Back side of your driving license', status: 'pending' },
    { id: 'aadhaar', name: 'Aadhaar Card / ID', description: 'Govt issued ID proof', status: 'pending' },
    { id: 'rc', name: 'Vehicle RC', description: 'Registration Certificate of your vehicle', status: 'pending' },
    { id: 'bank_proof', name: 'Bank Proof', description: 'Cancelled cheque or passbook front page', status: 'pending' },
];

const DocumentUploadScreen = () => {
    const navigation = useNavigation<any>();
    const [documents, setDocuments] = useState<Document[]>(REQUIRED_DOCUMENTS);
    const [currentDoc, setCurrentDoc] = useState<string | null>(null);
    const [cameraVisible, setCameraVisible] = useState(false);

    const handleCapture = (uri: string) => {
        setDocuments(docs => docs.map(d => d.id === currentDoc ? { ...d, uri, status: 'uploaded' } : d));
        setCameraVisible(false);
        setCurrentDoc(null);
    };

    const openCamera = (docId: string) => {
        setCurrentDoc(docId);
        setCameraVisible(true);
    };

    const removeDocument = (docId: string) => {
        setDocuments(docs => docs.map(d => d.id === docId ? { ...d, uri: undefined, status: 'pending' } : d));
    };

    const isAllUploaded = documents.every(d => d.status === 'uploaded');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Upload Documents</Text>
                <Text style={styles.subtitle}>Please upload clear photos of original documents</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {documents.map((doc) => (
                    <View key={doc.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.docInfo}>
                                <Text style={styles.docName}>{doc.name}</Text>
                                <Text style={styles.docDesc}>{doc.description}</Text>
                            </View>
                            {doc.status === 'uploaded' ? (
                                <View style={styles.statusBadge}>
                                    <Check size={14} color="white" />
                                </View>
                            ) : (
                                <View style={[styles.statusBadge, styles.pendingBadge]}>
                                    <AlertCircle size={14} color="#666" />
                                </View>
                            )}
                        </View>

                        {doc.uri ? (
                            <View style={styles.previewContainer}>
                                <Image source={{ uri: doc.uri }} style={styles.previewImage} />
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => removeDocument(doc.id)}
                                >
                                    <Trash2 size={20} color="#E23744" />
                                    <Text style={styles.removeText}>Retake</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={() => openCamera(doc.id)}
                            >
                                <Camera size={20} color="#E23744" />
                                <Text style={styles.uploadText}>Open Camera</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.nextButton, !isAllUploaded && styles.disabledButton]}
                    disabled={!isAllUploaded}
                    onPress={() => navigation.navigate('VehicleDetails')}
                >
                    <Text style={styles.nextButtonText}>Next: Vehicle Details</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={cameraVisible} animationType="slide">
                <DocumentCamera
                    onCapture={handleCapture}
                    onClose={() => setCameraVisible(false)}
                    title={documents.find(d => d.id === currentDoc)?.name || 'Upload Document'}
                />
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        padding: 24,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1C',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    content: {
        padding: 16,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    docInfo: {
        flex: 1,
        paddingRight: 10,
    },
    docName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    docDesc: {
        fontSize: 12,
        color: '#888',
    },
    statusBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pendingBadge: {
        backgroundColor: '#F0F0F0',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E23744',
        borderRadius: 8,
        padding: 12,
        borderStyle: 'dashed',
        backgroundColor: '#FFF5F6',
    },
    uploadText: {
        color: '#E23744',
        fontWeight: '600',
        marginLeft: 8,
    },
    previewContainer: {
        marginTop: 8,
    },
    previewImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        resizeMode: 'cover',
        marginBottom: 12,
    },
    removeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeText: {
        color: '#E23744',
        marginLeft: 8,
        fontWeight: '500',
    },
    footer: {
        padding: 24,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    nextButton: {
        backgroundColor: '#E23744',
        height: 52,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#CCC',
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default DocumentUploadScreen;
