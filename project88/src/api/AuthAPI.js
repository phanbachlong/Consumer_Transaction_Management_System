import axiosClient from './axiosClient';

const AuthAPI = {
    login: (data) => {
        // data: { username: "...", password: "..." }
        return axiosClient.post('/auth/login', data);
    },
    register: (data) => {
        return axiosClient.post('/auth/register', data);
    },

    logout: () => {
        return axiosClient.post('/auth/logout');
    }

};

export default AuthAPI;