import ChangePassword from '../features/auth/ChangePassword';
import axiosClient from './axiosClient';

const AuthAPI = {
    login: (data) => axiosClient.post('/auth/login', data),
    register: (data) => axiosClient.post('/auth/register', data),
    logout: () => axiosClient.post('/auth/logout'),
    verify: (token) => axiosClient.get(`/auth/verify?token=${token}`),
    forgotPassword: (email) => axiosClient.post(`/auth/forgot-password?email=${email}`),
    resetPassword: (data) => axiosClient.post('/auth/reset-password', data),
};

export default AuthAPI;