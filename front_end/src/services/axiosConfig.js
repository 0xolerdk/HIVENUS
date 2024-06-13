import axios from 'axios';
import AuthService from './AuthService.js'; 

const setupAxiosInterceptors = (navigate) => {
  axios.interceptors.request.use(
    config => {
      const token = AuthService.getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response && error.response.status === 403) {
        AuthService.logout();
        navigate('/auth/login');
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
