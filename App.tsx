import 'react-native-gesture-handler';

import Router from './src/router/index';
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { NetworkProvider } from 'react-native-offline';
import { DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import axiosInterceptor from './src/api/interceptor';
import Box from './src/components/ui/box';
import theme from './src/config/index';
import { persistor, store } from './src/store/configure-store';

export default function App() {
  axiosInterceptor(store);
  const fontConfig = {
    fontFamily: 'sans-serif',
  };
  const themes = {
    ...DefaultTheme,
    roundness: theme.radius.normal,
    fonts: configureFonts({ config: fontConfig }),
    colors: {
      ...DefaultTheme.colors,
      primary: theme.colors.primary,
      outline: theme.colors.borderColor,
      background: theme.colors.default,
      tertiary: theme.colors.lightPrimary,
      surface: theme.colors.lightPrimary,
      error: theme.colors.danger,
      elevation: {
        level0: 'white',
        level1: 'white',
        level2: 'white',
        level3: 'white',
        level4: 'white',
        level5: 'white',
      },
    },
  };

  const networkOptions = {
    pingOnlyIfOffline: true,
    pingTimeout: 1000,
    pingInterval: 5000,
    shouldPing: true,
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <NetworkProvider {...networkOptions}>
            <PaperProvider theme={themes}>
              <Box as={SafeAreaView} flex={1}>
                <Box as={KeyboardAvoidingView} flex={1}>
                  <Router />
                </Box>
              </Box>
            </PaperProvider>
          </NetworkProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
