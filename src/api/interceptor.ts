import axios from 'axios';
import { Env } from './env';

axios.defaults.baseURL = Env.API_URL;
const axiosInterceptor = (store: any, navigation: any) => {
  const { app } = store.getState();
  const requestSuccess = (config: any) => {
    config.headers['Authorization'] = `${app.token_type} ${app.access_token}`;
    // config.headers['Host'] = 'apitest.klyglsn.com';
    // config.headers['Content-Length'] = 100;
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
  };
  const responseSuccess = (response: any) => response.data;
  const responseError = (error: any) => Promise.reject(error.message);

  axios.interceptors.request.use(requestSuccess);
  axios.interceptors.response.use(responseSuccess, responseError);
};

export default axiosInterceptor;
