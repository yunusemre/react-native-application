import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { NetworkProvider } from 'react-native-offline';
import { DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import axiosInterceptor from './src/api/interceptor';
import Box from './src/components/ui/box';
import theme from './src/config';
import Router from './src/router';
import { store } from './src/store/configure-store';

export default function App() {
  axiosInterceptor(store, '');
  const fontConfig = {
    fontFamily: 'sans-serif',
  };

  useEffect(() => {
    console.log('init');
  }, []);

  const themes = {
    ...DefaultTheme,
    roundness: theme.radius.normal,
    fonts: configureFonts({ config: fontConfig }),
    colors: {
      ...DefaultTheme.colors,
      outline: theme.colors.borderColor,
      onBackground: theme.colors.default,
      background: theme.colors.default,
      primary: theme.colors.primary,
      secondary: theme.colors.default,
      tertiary: theme.colors.textColor,
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
    </Provider>
  );
}
