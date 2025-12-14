import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { ActiveOrder, updateOrderStatus } from '../../../store/slices/deliverySlice';
import OrderInfoCard from '../../../components/orders/OrderInfoCard';

interface Props {
    order: ActiveOrder;
}

const PickedUpView: React.FC<Props> = ({ order }) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>On the way to Customer</Text>
            </View>

            <OrderInfoCard
                title="DELIVER TO"
                name={order.customerName}
                address={order.customerAddress}
                phone={order.customerPhone}
                type="customer"
            />

            <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Collect Cash: ₹{0}</Text>
                <Text style={styles.infoSub}>Order is prepaid</Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.mainButton}
                    onPress={() => dispatch(updateOrderStatus('ARRIVED_CUSTOMER'))}
                >
                    <Text style={styles.buttonText}>I have arrived at Location</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        backgroundColor: '#E3F2FD',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    bannerText: {
        color: '#2196F3',
        fontWeight: '700',
        fontSize: 16,
    },
    infoBox: {
        backgroundColor: '#F5F5F5',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    infoSub: {
        fontSize: 14,
        color: '#666',
    },
    footer: {
        marginTop: 'auto',
        paddingTop: 16,
    },
    mainButton: {
        backgroundColor: '#1C1C1C',
        height: 52,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default PickedUpView;
