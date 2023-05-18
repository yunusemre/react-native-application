import axios from 'axios';
import { Env } from './env';

axios.defaults.baseURL = Env.API_URL;
const axiosInterceptor = (store: any) => {
  const state = store.getState();
  const requestSuccess = (config: any) => {
    if (!config.url.includes('login')) {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Host'] = 'apitest.klyglsn.com';
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
