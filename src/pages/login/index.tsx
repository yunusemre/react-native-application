import Box from '@components/ui/box';
import Text from '@components/ui/text';
import UITextInput from '@components/ui/textInput';
import theme from '@config/index';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoginStatus } from '@store/features/app-slice';
import { useAppDispatch } from '@store/hooks';
import axios from 'axios';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import * as yup from 'yup';

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const version: any = Constants.manifest?.extra[process.env.NODE_ENV].version;
  const { width }: { width: number } = Dimensions.get('screen');
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLogin, setIsLogin] = useState(false);
  const schema = yup
    .object({
      username: yup.string().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: 'burakhaylarpmoy',
      password: 'Asdf4321',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ username, password }: any) => {
    setIsLogin(true);
    const body = `username=${username}&password=${password}&grant_type=password&channel=2`;
    const config = {
      data: body,
      url: '/login',
      method: 'post',
    };
    axios(config)
      .then(async (response: any) => {
        if (response === 'undefined') return;
        dispatch(setLoginStatus(true));
        await AsyncStorage.setItem('access_token', response.access_token);
        setIsLogin(false);
        navigation.navigate('issues');
      })
      .catch((error) => {
        setErrorMessage(JSON.parse(error.error_description).ResultMessage);
        dispatch(setLoginStatus(false));
        setVisible(true);
      })
      .finally(() => {
        setIsLogin(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      reset();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <Box flex={1} bg="white" justifyContent="center" pr={20} pl={20}>
      <Box width="100%" justifyContent="center" alignItems="center">
        <Box as={Image} source={require('../../../assets/logo.png')} mb={30} />
        <Text style={styles.loginBigTitle}>Giriş Ekranı</Text>
        <Text style={styles.loginShortText}>Lütfen giriş yapmak için boş alanları doldurunuz</Text>
      </Box>
      <Box width="100%" justifyContent="center" alignItems="center">
        <UITextInput
          error={!!errors?.username?.message}
          control={control}
          label="User Name"
          name="username"
          placeholder="Enter user name"
          mode="outlined"
          rules={{ require: true }}
        />
        <UITextInput
          secureTextEntry
          error={!!errors?.password?.message}
          control={control}
          label="Password"
          name="password"
          testID="password"
          placeholder="Enter password"
          mode="outlined"
          rules={{ require: true }}
        />
        <Button
          disabled={isLogin}
          icon="send"
          loading={isLogin}
          style={styles.submitButton}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Giriş
        </Button>
      </Box>
      <Box mt={20} textAlign="center" as={Text}>
        {process.env.NODE_ENV === 'test' ? 'Test' : ''}
        {process.env.NODE_ENV === 'development' ? 'Development' : ''}
        {process.env.NODE_ENV === 'preprod' ? 'Preprod' : ''} - {version}
      </Box>
      <Snackbar
        wrapperStyle={{ width: width }}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        {errorMessage}
      </Snackbar>
    </Box>
  );
};

const styles = StyleSheet.create({
  loginShortText: {
    fontSize: 12,
    marginBottom: 15,
    color: theme.colors.textColor,
  },
  loginBigTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  fields: {
    width: '100%',
    marginBottom: 10,
    color: theme.colors.default,
  },
  submitButton: {
    width: '100%',
    borderRadius: theme.radius.normal,
  },
});
export default LoginScreen;
