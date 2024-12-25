import axios, { CreateAxiosDefaults } from 'axios'
import { Notification } from '@arco-design/web-vue';


// 创建axios实例的默认基础配置
const baseAxiosConfig: CreateAxiosDefaults = {
  timeout: 60 * 1000,
};

// 创建axios实例函数
const createInstance = (config: CreateAxiosDefaults) => {
  const instance = axios.create(Object.assign({}, baseAxiosConfig, config))
  instance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      Notification.error({
        title: process.env.NODE_ENV === 'development' ? (error.code || '网络异常') : '网络异常',
        content: process.env.NODE_ENV === 'development' ? (error?.response?.data?.message || error?.message || '网络异常,请稍后重试') : '网络异常,请稍后重试',
      });
      return Promise.reject(error);
    }
  );
  return instance;
};

export default createInstance;