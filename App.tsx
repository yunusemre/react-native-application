import 'react-native-gesture-handler';

import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from 'react-native';
import { NetworkProvider } from 'react-native-offline';
import { DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import axiosInterceptor from './src/api/interceptor';
import AppColors from './src/config/colors';
import theme from './src/config/theme';
import AppTypography from './src/config/typography';
import Router from './src/router';
import { store } from './src/store/configure-store';

axiosInterceptor(store);
export default function App() {
  const fontConfig = {
    fontFamily: 'sans-serif',
  };

  const themes = {
    ...DefaultTheme,
    roundness: AppTypography.roundness,
    fonts: configureFonts({ config: fontConfig }),
    colors: {
      ...DefaultTheme.colors,
      outline: AppColors.borderColor,
      onBackground: 'white',
      primary: AppColors.primary,
      secondary: AppColors.default,
      tertiary: AppColors.textColor,
    },
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NetworkProvider>
          <PaperProvider theme={themes}>
            <SafeAreaView style={[styles.safeArea]}>
              <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                <Router />
              </KeyboardAvoidingView>
            </SafeAreaView>
          </PaperProvider>
        </NetworkProvider>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 24 : 0,
  },
  keyboardView: {
    flex: 1,
  },
});
