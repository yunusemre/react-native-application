import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Snackbar, Text } from 'react-native-paper';
import * as yup from 'yup';
import UITextInput from '../../components/ui/textInput';
import AppColors from '../../config/colors';
import AppTypography from '../../config/typography';

const LoginScreen = ({ navigation }: any) => {
  const [visible, setVisible] = React.useState(false);
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
    const login = await axios.get('/login');
    if (JSON.stringify(data) === JSON.stringify(login.data)) {
      navigation.navigate('home');
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => reset());
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.loginScreen}>
      <View style={styles.loginForm}>
        <Image source={require('../../../assets/logo.png')} style={{ marginBottom: 30 }} />
        <Text style={styles.loginBigTitle}>Giriş Ekranı</Text>
        <Text style={styles.loginShortText}>Lütfen giriş yapmak için boş alanları doldurunuz</Text>
      </View>
      <View style={styles.loginForm}>
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
        <Button style={styles.submitButton} mode="contained" onPress={handleSubmit(onSubmit)}>
          Gönder
        </Button>
      </View>
      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        Kullanıcı adı veya şifreniz hatalıdır. Tekrar deneyiniz.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  loginShortText: {
    fontSize: 12,
    marginBottom: 15,
    color: AppColors.textColor,
  },
  loginForm: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBigTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  fields: {
    width: '100%',
    marginBottom: 10,
    color: AppColors.default,
  },
  submitButton: {
    width: '100%',
    borderRadius: AppTypography.roundness,
  },
  appVersion: {
    marginTop: 40,
    textAlign: 'center',
  },
});
export default LoginScreen;
