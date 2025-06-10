import axiosClient from './axiosClient';

const AuthAPI = {
    login: (data) => axiosClient.post('/auth/login', data),
    register: (data) => axiosClient.post('/auth/register', data),
    logout: () => axiosClient.post('/auth/logout'),
    verify: (token) => axiosClient.get(`/auth/verify?token=${token}`),
};

export default AuthAPI;