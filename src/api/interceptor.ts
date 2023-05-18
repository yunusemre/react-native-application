import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Env } from './env';

axios.defaults.baseURL = Env.API_URL;
const axiosInterceptor = () => {
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
    (response: AxiosResponse) => response.data,
    async (err: AxiosError) => {
      return Promise.reject(err);
    }
  );
};

export default axiosInterceptor;
