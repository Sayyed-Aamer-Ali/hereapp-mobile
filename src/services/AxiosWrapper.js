import axios from 'axios';
import AlertService from './AlertService';
import store from '../redux/Store';
import {resetAuth} from '../redux/Reducers/AuthReducer';
// Add request interceptor
// Add response interceptor
axios.interceptors.response.use(
  response => {
    const {config} = response;
    const {method} = config;
    return response;
  },
  error => {
    const {config} = error.response;
    const {method} = config;
    return Promise.reject(error);
  },
);
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const axiosWrapper = async (
  method,
  url,
  data,
  token,
  isFormData = false,
  responseType = 'json',
  showToast = false,
  isObj = false,
) => {
  try {
    const config = {
      method,
      url,
      ...axiosConfig,
      responseType,
    };

    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    if (isFormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
      config.data = data;
    } else {
      config.headers['Content-Type'] = 'application/json';
      if (data) config.data = data;
    }
    // console.log('config :>> ', config);
    const response = await axios(config);

    if ((response?.data?.message || response?.message) && showToast) {
      AlertService.toastPrompt(response.data.message || response.message);
    }
    return response.data ? response.data : response;
  } catch (error) {
    // console.log(error?.response?.data, 'Im error', url);
    let msg =
      error?.response?.data?.validation?.body?.message ||
      error?.response?.data?.desc ||
      error?.response?.data?.message ||
      error?.message;
    if (msg && showToast) {
      AlertService.toastPrompt(msg, 'error');
    }
    let errorCode = error?.response?.status;

    if (
      msg === 'Unauthorized' ||
      msg == "Couldn't find your account, please create an account" ||
      msg == 'Your account is suspended or deleted. Please contact admin!' ||
      errorCode === 401
    ) {
      store.dispatch(resetAuth());
      if (msg == "Couldn't find your account, please create an account") {
        AlertService.toastPrompt(msg, 'error');
      }
      if (
        msg == 'Your account is suspended or deleted. Please contact admin!'
      ) {
        AlertService.toastPrompt(msg, 'error');
      } else {
        AlertService.toastPrompt('You are not an authorized user', 'error');
      }
    }
    return Promise.reject(isObj ? {msg, data: error?.response.data} : msg);
  }
};
export default axiosWrapper;
