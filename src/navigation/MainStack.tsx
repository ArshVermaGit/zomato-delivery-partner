import { createStackNavigator, CardStyleInterpolators, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';

// ... other imports ...

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerStyleInterpolator: HeaderStyleInterpolators.forFade,
                transitionSpec: {
                    open: TransitionSpecs.TransitionIOSSpec,
                    close: TransitionSpecs.TransitionIOSSpec,
                },
                gestureEnabled: true,
                gestureDirection: 'horizontal',
            }}
        >
            <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />

            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
            {/* Removed OrdersList, Earnings, Profile as they are now in Tabs */}

            <Stack.Screen name="PayoutScreen" component={PayoutScreen} options={{ headerTitle: 'Withdraw Money' }} />
            <Stack.Screen name="Incentives" component={IncentivesScreen} />
            <Stack.Screen name="Performance" component={PerformanceScreen} />

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
