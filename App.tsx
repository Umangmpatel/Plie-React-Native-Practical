import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { AppNavigator } from './src/navigation';
import { store, persistor } from './src/store';
import { ErrorBoundary } from './src/components/common';
import { toastConfig } from './src/utils/toast';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
              <KeyboardProvider>
                <AppNavigator />
              </KeyboardProvider>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
      <Toast config={toastConfig as any} topOffset={55} />
    </GestureHandlerRootView>
  );
}
