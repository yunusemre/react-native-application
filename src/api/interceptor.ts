import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistor } from '@store/configure-store';
import { setLoginStatus } from '@store/features/app-slice';
import { useAppDispatch } from '@store/hooks';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Env } from './env';

const httpAuthorizationErrorCode = 401;

axios.defaults.baseURL = Env.API_URL;
const axiosInterceptor = () => {
  const dispatch = useAppDispatch();
  axios.interceptors.request.use(
    async (config: any) => {
      const token: string | null = await AsyncStorage.getItem('access_token');
      if (token !== '') {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => response?.data,
    async (error: AxiosError) => {
      console.log('error.status', error);
      if (error.status === httpAuthorizationErrorCode || error.status === undefined) {
        dispatch(setLoginStatus(false));
        await AsyncStorage.setItem('access_token', '');
        persistor.purge();
        return;
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInterceptor;
