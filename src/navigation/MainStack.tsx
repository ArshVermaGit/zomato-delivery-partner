import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import OrderDetailScreen from '../screens/orders/OrderDetailScreen';
import OrdersListScreen from '../screens/orders/OrdersListScreen';
import EarningsScreen from '../screens/earnings/EarningsScreen';
import PayoutScreen from '../screens/earnings/PayoutScreen';
import IncentivesScreen from '../screens/performance/IncentivesScreen';
import PerformanceScreen from '../screens/performance/PerformanceScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import MyDetailsScreen from '../screens/profile/subscreens/MyDetailsScreen';
import VehicleDetailsScreen from '../screens/profile/subscreens/VehicleDetailsScreen';
import DocumentsScreen from '../screens/profile/subscreens/DocumentsScreen';
import SafetyCenterScreen from '../screens/safety/SafetyCenterScreen';
import SOSScreen from '../screens/safety/SOSScreen';
import AccidentReportScreen from '../screens/safety/AccidentReportScreen';

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
            <Stack.Screen name="OrdersList" component={OrdersListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Earnings" component={EarningsScreen} />
            <Stack.Screen name="PayoutScreen" component={PayoutScreen} options={{ headerTitle: 'Withdraw Money' }} />
            <Stack.Screen name="Incentives" component={IncentivesScreen} />
            <Stack.Screen name="Performance" component={PerformanceScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MyDetails" component={MyDetailsScreen} options={{ headerTitle: 'My Details' }} />
            <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} options={{ headerTitle: 'Vehicle Details' }} />
            <Stack.Screen name="Documents" component={DocumentsScreen} options={{ headerTitle: 'My Documents' }} />
            <Stack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ headerTitle: 'Help & Support' }} />

            <Stack.Screen name="SafetyCenter" component={SafetyCenterScreen} options={{ headerTitle: 'Safety Center' }} />
            <Stack.Screen name="SOSScreen" component={SOSScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AccidentReport" component={AccidentReportScreen} options={{ headerTitle: 'Report Accident' }} />
        </Stack.Navigator>
    );
};

export default MainStack;
