import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store, persistor } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';

import { useNotifications } from './src/hooks/useNotifications';
// import { LocationTrackingService } from './src/services/LocationTrackingService';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useNotifications();
  // LocationTrackingService.startTracking(); // Should be controlled by UI

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
