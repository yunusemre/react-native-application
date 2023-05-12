import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Constants from 'expo-constants';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Image, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import * as yup from 'yup';
import Box from '../../components/ui/box';
import Text from '../../components/ui/text';
import UITextInput from '../../components/ui/textInput';
import theme from '../../config';

const LoginScreen = ({ navigation }: any) => {
  const [visible, setVisible] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
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
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLogin(true);
      const login = await axios.get('/login');
      setTimeout(() => {
        if (JSON.stringify(data) === JSON.stringify(login.data)) {
          navigation.navigate('home');
        } else {
          setVisible(true);
        }
        setIsLogin(false);
      }, 1000);
    } catch (error) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => reset());
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
          Gönder
        </Button>
      </Box>
      <Box mt={20} textAlign="center" as={Text}>
        {Constants.manifest?.version}
      </Box>
      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        Kullanıcı adı veya şifreniz hatalıdır. Tekrar deneyiniz.
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
