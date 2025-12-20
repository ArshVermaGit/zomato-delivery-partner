import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { ActiveOrder, updateOrderStatusThunk } from '../../../store/slices/deliverySlice';
import OrderInfoCard from '../../../components/orders/OrderInfoCard';
import OrderItemsList from '../../../components/orders/OrderItemsList';

interface Props {
    order: ActiveOrder;
}

const AcceptedView: React.FC<Props> = ({ order }) => {
    const dispatch = useDispatch<any>();

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Text style={styles.bannerText}>Go to Restaurant</Text>
            </View>

            <OrderInfoCard
                title="PICKUP FROM"
                name={order.restaurantName}
                address={order.restaurantAddress}
                phone={order.restaurantPhone || ''}
                type="restaurant"
            />

            <OrderItemsList items={order.items} />

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.mainButton}
                    onPress={() => dispatch(updateOrderStatusThunk({ orderId: order.id, status: 'ARRIVED_RESTAURANT' }))}
                >
                    <Text style={styles.buttonText}>I have arrived at Restaurant</Text>
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
        backgroundColor: '#E8F5E9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    bannerText: {
        color: '#2FB050',
        fontWeight: '700',
        fontSize: 16,
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

export default AcceptedView;
