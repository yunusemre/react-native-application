import axios from 'axios';
import { Env } from './env';

axios.defaults.baseURL = Env.API_URL;
const axiosInterceptor = (store: any, navigation: any) => {
  const state = store.getState();
  const requestSuccess = (config: any) => {
    console.log('apps', state.apps);
    if (state.apps.access_token !== null) {
      config.headers['Authorization'] = `Bearer ${state.apps.access_token}`;
    }
    return config;
  };
  const responseSuccess = (response: any) => response.data;
  const responseError = (error: any) => {
    return Promise.reject(error.message);
  };

  axios.interceptors.request.use(requestSuccess);
  axios.interceptors.response.use(responseSuccess, responseError);
};

export default axiosInterceptor;
