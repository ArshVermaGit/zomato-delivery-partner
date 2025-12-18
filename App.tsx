import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { store, persistor } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { ErrorBoundary } from './src/components/Common/ErrorBoundary';
import { colors } from '@/theme';

/**
 * Root App Component
 * 
 * Initialization order:
 * 1. Polyfills & Global Config
 * 2. GestureHandlerRootView (Required for Reanimated & Gestures)
 * 3. Provider (Redux Store)
 * 4. ErrorBoundary (Catches UI crashes)
 * 5. PersistGate (Wait for storage to rehydrate)
 * 6. SafeAreaProvider (Native safe area context)
 * 7. Navigation (RootNavigator)
 */
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load anything here (fonts, assets, initial API calls)
        // For now, just a small delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.primary.zomato_red, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ErrorBoundary>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor="transparent"
                translucent
              />
              <RootNavigator />
            </SafeAreaProvider>
          </PersistGate>
        </ErrorBoundary>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
