import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { X, Zap, ZapOff, Camera } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface DocumentCameraProps {
    onCapture: (uri: string) => void;
    onClose: () => void;
    title: string;
}

const DocumentCamera: React.FC<DocumentCameraProps> = ({ onCapture, onClose, title }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>('back');
    const [flash, setFlash] = useState<'on' | 'off'>('off');
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <X color="#FFF" size={24} />
                </TouchableOpacity>
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.7,
                    base64: false,
                    skipProcessing: false,
                });
                if (photo) {
                    onCapture(photo.uri);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                flash={flash}
                ref={cameraRef}
            >
                <View style={styles.overlay}>
                    {/* Header */}
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={onClose} style={styles.iconButton}>
                            <X color="#FFF" size={24} />
                        </TouchableOpacity>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity onPress={() => setFlash(f => f === 'on' ? 'off' : 'on')} style={styles.iconButton}>
                            {flash === 'on' ? <Zap color="#FFF" size={24} /> : <ZapOff color="#FFF" size={24} />}
                        </TouchableOpacity>
                    </View>

                    {/* Guide Frame */}
                    <View style={styles.guideContainer}>
                        <View style={styles.guideFrame}>
                            <View style={[styles.corner, styles.topLeft]} />
                            <View style={[styles.corner, styles.topRight]} />
                            <View style={[styles.corner, styles.bottomLeft]} />
                            <View style={[styles.corner, styles.bottomRight]} />
                        </View>
                        <Text style={styles.guideText}>Place document within the frame</Text>
                    </View>

                    {/* Controls */}
                    <View style={styles.bottomBar}>
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={takePicture}
                        >
                            <View style={styles.captureInner} />
                        </TouchableOpacity>
                    </View>
                </View>
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: 'white',
        fontSize: 16,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    iconButton: {
        padding: 10,
    },
    guideContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guideFrame: {
        width: width * 0.85,
        height: height * 0.6,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: 12,
        position: 'relative',
    },
    corner: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderColor: 'white',
        borderWidth: 3,
    },
    topLeft: { top: -1, left: -1, borderBottomWidth: 0, borderRightWidth: 0 },
    topRight: { top: -1, right: -1, borderBottomWidth: 0, borderLeftWidth: 0 },
    bottomLeft: { bottom: -1, left: -1, borderTopWidth: 0, borderRightWidth: 0 },
    bottomRight: { bottom: -1, right: -1, borderTopWidth: 0, borderLeftWidth: 0 },
    guideText: {
        color: 'white',
        marginTop: 20,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        overflow: 'hidden',
    },
    bottomBar: {
        paddingBottom: 40,
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    captureButton: {
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 4,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    permissionButton: {
        backgroundColor: '#E23744',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    permissionButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
});

export default DocumentCamera;
