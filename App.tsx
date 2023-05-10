import 'react-native-gesture-handler';

import Bugsnag from '@bugsnag/expo';
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';
import { NetworkProvider } from 'react-native-offline';
import { DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import axiosInterceptor from './src/api/interceptor';
import Box from './src/components/ui/box';
import Text from './src/components/ui/text';
import theme from './src/config';
import Router from './src/router';
import { store } from './src/store/configure-store';

export default function App() {
  Bugsnag.start();
  axiosInterceptor(store);
  const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);
  const fontConfig = {
    fontFamily: 'sans-serif',
  };

  const themes = {
    ...DefaultTheme,
    roundness: theme.radius.normal,
    fonts: configureFonts({ config: fontConfig }),
    colors: {
      ...DefaultTheme.colors,
      outline: theme.colors.borderColor,
      onBackground: 'white',
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
    <ErrorBoundary FallbackComponent={ErrorView}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NetworkProvider {...networkOptions}>
            <PaperProvider theme={themes}>
              <SafeAreaView style={[styles.safeArea]}>
                <KeyboardAvoidingView style={styles.keyboardView}>
                  <Router />
                </KeyboardAvoidingView>
              </SafeAreaView>
            </PaperProvider>
          </NetworkProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

const ErrorView = () => (
  <Box>
    <Text>Inform users of an error in the component tree.</Text>
  </Box>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
});
