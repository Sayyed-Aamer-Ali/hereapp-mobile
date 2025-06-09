import axios from 'axios';
import AlertService from './AlertService';
import store from '../redux/Store';
import {resetAuth} from '../redux/Reducers/AuthReducer';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🛫 Request Interceptor
axiosInstance.interceptors.request.use(
  request => {
    console.log('📤 [Request]');
    console.log(`➡️ URL: ${request.url}`);
    console.log(`📡 METHOD: ${request.method.toUpperCase()}`);
    console.log(`🔐 TOKEN: ${request.headers.Authorization || 'No Token'}`);
    console.log('📦 BODY:', request.data || 'No Body');
    return request;
  },
  error => {
    console.log('❌ [Request Error]', error);
    return Promise.reject(error);
  }
);

// 🛬 Response Interceptor
axiosInstance.interceptors.response.use(
  response => {
    console.log('✅ [Response]');
    console.log(`✅ STATUS: ${response.status}`);
    console.log('📨 DATA:', response.data);
    return response;
  },
  error => {
    console.log('❌ [Response Error]');
    if (error.response) {
      console.log(`⛔ STATUS: ${error.response.status}`);
      console.log('🪵 ERROR DATA:', error.response.data);
    } else {
      console.log('🧨 ERROR MESSAGE:', error.message);
    }
    return Promise.reject(error);
  }
);

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
      responseType,
      headers: {},
    };

    if (token) config.headers['Authorization'] = `Bearer ${token}`;

    if (isFormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
      config.data = data;
    } else {
      config.headers['Content-Type'] = 'application/json';
      if (data) config.data = data;
    }

    const response = await axiosInstance(config);

    if ((response?.data?.message || response?.message) && showToast) {
      AlertService.toastPrompt(response.data.message || response.message);
    }

    return response.data ? response.data : response;
  } catch (error) {
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
      if (msg == "Couldn't find your account, please create an account" ||
          msg == 'Your account is suspended or deleted. Please contact admin!') {
        AlertService.toastPrompt(msg, 'error');
      } else {
        AlertService.toastPrompt('Please Sign-In and Verify your Email', 'error');
      }
    }

    return Promise.reject(isObj ? {msg, data: error?.response?.data} : msg);
  }
};

export default axiosWrapper;
