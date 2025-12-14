import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react-native';
import { OrderItem } from '../../store/slices/deliverySlice';

interface Props {
    items: OrderItem[];
}

const OrderItemsList: React.FC<Props> = ({ items }) => {
    const [expanded, setExpanded] = useState(false);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => setExpanded(!expanded)}
            >
                <View style={styles.headerLeft}>
                    <ShoppingBag size={20} color="#666" />
                    <Text style={styles.title}>Order Items ({totalItems})</Text>
                </View>
                {expanded ? <ChevronUp size={20} color="#666" /> : <ChevronDown size={20} color="#666" />}
            </TouchableOpacity>

            {expanded && (
                <View style={styles.list}>
                    {items.map((item, index) => (
                        <View key={index} style={styles.itemRow}>
                            <View style={styles.quantityBadge}>
                                <Text style={styles.quantityText}>{item.quantity}x</Text>
                            </View>
                            <Text style={styles.itemName}>{item.name}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    list: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    quantityBadge: {
        backgroundColor: '#FFF0F1',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 12,
    },
    quantityText: {
        color: '#E23744',
        fontWeight: '700',
        fontSize: 12,
    },
    itemName: {
        fontSize: 15,
        color: '#1C1C1C',
        flex: 1,
    }
});

export default OrderItemsList;
