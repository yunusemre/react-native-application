import axios from 'axios';
import { Env } from './env';

axios.defaults.baseURL = Env.API_URL;
const axiosInterceptor = (store: any) => {
  const state = store.getState();
  const requestSuccess = (config: any) => {
    config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    return config;
  };
  const responseSuccess = (response: any) => response;
  const responseError = (error: any) => {
    console.log(error);
    return Promise.reject(error.message);
  };

  axios.interceptors.request.use(requestSuccess);
  axios.interceptors.response.use(responseSuccess, responseError);
};

export default axiosInterceptor;
