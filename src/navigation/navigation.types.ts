import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

/**
 * Root Stack Parameter List
 */
export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    DeliveryOnboarding: NavigatorScreenParams<OnboardingStackParamList>;
    MainStack: NavigatorScreenParams<MainStackParamList>;
};

/**
 * Auth Stack Parameter List
 */
export type AuthStackParamList = {
    Login: undefined;
};

/**
 * Onboarding Stack Parameter List
 */
export type OnboardingStackParamList = {
    OnboardingWelcome: undefined;
    DocumentUpload: undefined;
    VehicleDetails: undefined;
    BankDetails: undefined;
    VerificationStatus: undefined;
};

/**
 * Main Tab Parameter List
 */
export type TabParamList = {
    Home: undefined;
    Orders: undefined;
    Earnings: undefined;
    Profile: undefined;
};

/**
 * Main Stack Parameter List (Nested within RootStack)
 */
export type MainStackParamList = {
    MainTabs: NavigatorScreenParams<TabParamList>;
    OrderDetail: { orderId: string };
    PayoutScreen: undefined;
    Incentives: undefined;
    Performance: undefined;
    MyDetails: undefined;
    VehicleDetails: undefined;
    Documents: undefined;
    HelpSupport: undefined;
    SafetyCenter: undefined;
    SOSScreen: undefined;
    AccidentReport: undefined;
};

/**
 * Composite Type Helpers
 */

/**
 * Props for screens in the Main Tab Navigator
 * Allows navigation to screens in the MainStack and the RootStack
 */
export type MainTabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    CompositeScreenProps<
        StackScreenProps<MainStackParamList>,
        StackScreenProps<RootStackParamList>
    >
>;

/**
 * Props for screens in the Main Stack Navigator
 */
export type MainStackScreenProps<T extends keyof MainStackParamList> = CompositeScreenProps<
    StackScreenProps<MainStackParamList, T>,
    StackScreenProps<RootStackParamList>
>;

/**
 * Global navigation type for useNavigation hook
 */
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
