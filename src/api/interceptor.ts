import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistor } from '@store/configure-store';
import { setLoginStatus } from '@store/features/app-slice';
import { useAppDispatch } from '@store/hooks';
import axios, { AxiosResponse } from 'axios';
import { Env } from './env';

const httpAuthorizationErrorCode = 401;

axios.defaults.baseURL = Env.API_URL;
const axiosInterceptor = () => {
  const dispatch = useAppDispatch();
  axios.interceptors.request.use(
    async (config: any) => {
      const token: any = await AsyncStorage.getItem('access_token');
      const loc: any = await AsyncStorage.getItem('location');
      const location: any = JSON.parse(loc);
      if (token !== '') {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['Latitude'] = location?.latitude;
        config.headers['Longitude'] = location?.longitude;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => response?.data,
    async (error: any) => {
      if (
        error.status === httpAuthorizationErrorCode ||
        error.status === 400 ||
        error.status === undefined
      ) {
        dispatch(setLoginStatus(false));
        await AsyncStorage.setItem('access_token', '');
        persistor.purge();
        return error.response;
      }
      return Promise.reject(error.response);
    }
  );
};

export default axiosInterceptor;
