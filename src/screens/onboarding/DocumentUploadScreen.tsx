import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ChevronLeft, User, CreditCard, FileText, Building2, Info, CheckCircle, RotateCcw, Upload, IdCard } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';

// Mock ActionSheet for now since we don't have a native module for it readily available in valid list
// In a real app we might use a library or custom modal. Using Alert for simplicity in this implementation step.

export const DocumentUploadScreen = () => {
    const navigation = useNavigation<any>();
    const [documents, setDocuments] = useState<Record<string, any>>({
        profile_photo: null,
        drivers_license_front: null,
        drivers_license_back: null,
        aadhaar_front: null,
        aadhaar_back: null,
        vehicle_rc: null,
        bank_proof: null,
    });

    const documentTypes = [
        {
            key: 'profile_photo',
            title: 'Profile Photo',
            description: 'Upload a clear photo of yourself',
            icon: <User size={24} color={colors.primary.zomato_red} />,
            required: true,
        },
        {
            key: 'drivers_license_front',
            title: "Driver's License (Front)",
            description: 'Front side of your driving license',
            icon: <CreditCard size={24} color={colors.primary.zomato_red} />,
            required: true,
        },
        {
            key: 'drivers_license_back',
            title: "Driver's License (Back)",
            description: 'Back side of your driving license',
            icon: <CreditCard size={24} color={colors.primary.zomato_red} />,
            required: true,
        },
        {
            key: 'aadhaar_front',
            title: 'Aadhaar Card (Front)',
            description: 'Front side of your Aadhaar card',
            icon: <IdCard size={24} color={colors.primary.zomato_red} />,
            required: true,
        },
        {
            key: 'aadhaar_back',
            title: 'Aadhaar Card (Back)',
            description: 'Back side of your Aadhaar card',
            icon: <IdCard size={24} color={colors.primary.zomato_red} />,
            required: true,
        },
        {
            key: 'vehicle_rc',
            title: 'Vehicle RC',
            description: 'Registration certificate of your vehicle',
            icon: <FileText size={24} color={colors.primary.zomato_red} />,
            required: true,
        },
        {
            key: 'bank_proof',
            title: 'Bank Proof',
            description: 'Cancelled cheque or passbook first page',
            icon: <Building2 size={24} color={colors.primary.zomato_red} />,
            required: true,
        },
    ];

    const uploadProgress = useMemo(() => {
        const uploaded = Object.values(documents).filter(Boolean).length;
        return (uploaded / documentTypes.length) * 100;
    }, [documents, documentTypes.length]);

    const handleUpload = async (key: string, file: any) => {
        setDocuments(prev => ({ ...prev, [key]: file }));
    };

    const handleRetake = (key: string) => {
        setDocuments(prev => ({ ...prev, [key]: null }));
    };

    const handleSubmit = () => {
        // In real app, dispatch action to upload documents
        navigation.navigate('VerificationStatus');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={colors.secondary.gray_900} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Upload Documents</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressInfo}>
                    <Text style={styles.progressText}>
                        {Object.values(documents).filter(Boolean).length} of {documentTypes.length} uploaded
                    </Text>
                    <Text style={styles.progressPercentage}>{Math.round(uploadProgress)}%</Text>
                </View>
                <View style={styles.progressBarBg}>
                    <Animated.View
                        style={[
                            styles.progressBarFill,
                            { width: `${uploadProgress}%` }
                        ]}
                    />
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Info Banner */}
                <View style={styles.infoBanner}>
                    <Info size={20} color={colors.semantic.info} />
                    <Text style={styles.infoText}>
                        All documents will be verified within 24-48 hours
                    </Text>
                </View>

                {/* Document Cards */}
                {documentTypes.map((docType) => (
                    <DocumentCard
                        key={docType.key}
                        docType={docType}
                        document={documents[docType.key]}
                        onUpload={(file: any) => handleUpload(docType.key, file)}
                        onRetake={() => handleRetake(docType.key)}
                    />
                ))}
            </ScrollView>

            {/* Submit Button */}
            <View style={styles.bottomAction}>
                <TouchableOpacity
                    style={[styles.button, uploadProgress < 100 && styles.buttonDisabled]}
                    disabled={uploadProgress < 100}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Submit for Verification</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// Document Card Component
const DocumentCard = ({ docType, document, onUpload, onRetake }: any) => {
    const [uploading, setUploading] = useState(false);

    const handlePickDocument = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: docType.key === 'profile_photo' ? [1, 1] : [4, 3],
                quality: 0.8,
            });

            if (!result.canceled) {
                setUploading(true);
                // Simulate network delay
                setTimeout(async () => {
                    await onUpload(result.assets[0]);
                    setUploading(false);
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }, 1000);
            }
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const handleTakePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Camera permission is required');
            return;
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: docType.key === 'profile_photo' ? [1, 1] : [4, 3],
                quality: 0.8,
            });

            if (!result.canceled) {
                setUploading(true);
                // Simulate network delay
                setTimeout(async () => {
                    await onUpload(result.assets[0]);
                    setUploading(false);
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }, 1000);
            }
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const showOptions = () => {
        Alert.alert(
            'Upload Document',
            'Choose an option',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Take Photo', onPress: handleTakePhoto },
                { text: 'Choose from Gallery', onPress: handlePickDocument },
            ]
        );
    };

    return (
        <Animated.View entering={FadeIn} style={styles.documentCard}>
            {/* Icon & Info */}
            <View style={styles.documentHeader}>
                <View style={styles.documentIconContainer}>
                    {docType.icon}
                </View>
                <View style={styles.documentInfo}>
                    <View style={styles.documentTitleRow}>
                        <Text style={styles.documentTitle}>{docType.title}</Text>
                        {docType.required && (
                            <View style={styles.requiredBadge}>
                                <Text style={styles.requiredText}>Required</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.documentDescription}>{docType.description}</Text>
                </View>
            </View>

            {/* Upload Area */}
            {document ? (
                <View style={styles.uploadedContainer}>
                    <Image source={{ uri: document.uri }} style={styles.uploadedImage} />
                    <View style={styles.uploadedOverlay}>
                        <View style={styles.uploadedBadge}>
                            <CheckCircle size={16} color={colors.semantic.success} />
                            <Text style={styles.uploadedText}>Uploaded</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.retakeButton}
                            onPress={onRetake}
                        >
                            <RotateCcw size={16} color={colors.secondary.white} />
                            <Text style={styles.retakeText}>Retake</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={showOptions}
                    disabled={uploading}
                >
                    {uploading ? (
                        <ActivityIndicator color={colors.primary.zomato_red} />
                    ) : (
                        <>
                            <View style={styles.uploadIconContainer}>
                                <Upload size={24} color={colors.primary.zomato_red} />
                            </View>
                            <Text style={styles.uploadButtonText}>Upload Document</Text>
                            <Text style={styles.uploadHint}>Tap to take photo or choose from gallery</Text>
                        </>
                    )}
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary.gray_50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.base,
        backgroundColor: colors.secondary.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary.gray_200,
    },
    headerTitle: {
        ...typography.h3,
        color: colors.secondary.gray_900,
    },
    progressContainer: {
        backgroundColor: colors.secondary.white,
        padding: spacing.base,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary.gray_200,
    },
    progressInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    progressText: {
        ...typography.body_medium,
        color: colors.secondary.gray_600,
    },
    progressPercentage: {
        ...typography.label_medium,
        color: colors.primary.zomato_red,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: colors.secondary.gray_200,
        borderRadius: borderRadius.full,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.primary.zomato_red,
        borderRadius: borderRadius.full,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.base,
    },
    infoBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.semantic.info_light,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
        marginBottom: spacing.base,
    },
    infoText: {
        ...typography.body_small,
        color: colors.semantic.info,
        flex: 1,
    },
    documentCard: {
        backgroundColor: colors.secondary.white,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        marginBottom: spacing.base,
        ...shadows.card,
    },
    documentHeader: {
        flexDirection: 'row',
        marginBottom: spacing.base,
        gap: spacing.md,
    },
    documentIconContainer: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.primary.zomato_red_tint,
        alignItems: 'center',
        justifyContent: 'center',
    },
    documentInfo: {
        flex: 1,
    },
    documentTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.xs,
    },
    documentTitle: {
        ...typography.label_large,
        color: colors.secondary.gray_900,
    },
    requiredBadge: {
        backgroundColor: colors.semantic.error_light,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    requiredText: {
        ...typography.caption,
        color: colors.semantic.error,
        fontWeight: '600',
    },
    documentDescription: {
        ...typography.body_small,
        color: colors.secondary.gray_600,
    },
    uploadButton: {
        borderWidth: 1.5,
        borderColor: colors.secondary.gray_300,
        borderStyle: 'dashed',
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
        alignItems: 'center',
        backgroundColor: colors.secondary.gray_50,
    },
    uploadIconContainer: {
        width: 56,
        height: 56,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.secondary.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
        ...shadows.sm,
    },
    uploadButtonText: {
        ...typography.label_medium,
        color: colors.secondary.gray_900,
        marginBottom: spacing.xs,
    },
    uploadHint: {
        ...typography.caption,
        color: colors.secondary.gray_500,
        textAlign: 'center',
    },
    uploadedContainer: {
        position: 'relative',
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    uploadedImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    uploadedOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: spacing.md,
        justifyContent: 'space-between',
    },
    uploadedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary.white,
        alignSelf: 'flex-start',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        gap: spacing.xs,
    },
    uploadedText: {
        ...typography.label_small,
        color: colors.semantic.success,
        fontWeight: '600',
    },
    retakeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignSelf: 'center',
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        gap: spacing.xs,
    },
    retakeText: {
        ...typography.label_medium,
        color: colors.secondary.white,
    },
    bottomAction: {
        padding: spacing.base,
        backgroundColor: colors.secondary.white,
        borderTopWidth: 1,
        borderTopColor: colors.secondary.gray_200,
    },
    button: {
        backgroundColor: colors.primary.zomato_red,
        height: 48,
        borderRadius: borderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: colors.secondary.gray_400,
    },
    buttonText: {
        color: colors.secondary.white,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default DocumentUploadScreen;
