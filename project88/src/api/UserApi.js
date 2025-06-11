import axiosClient from './axiosClient';

const url = '/users';

const createUser = (body) => {
    axiosClient.post(url, body);
}

const getProfile = () => {
    return axiosClient.get(`${url}/profile`);
}

const getAllUsers = () => {
    return axiosClient.get(`${url}/all`);
}

const topUp = (body) => {
    return axiosClient.post("/users/top-up", body);
};

const updateProfile = (body) => {
    return axiosClient.put(`${url}/profile`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

const UserApi = {
    createUser,
    getProfile,
    getAllUsers,
    topUp,
    updateProfile
}
export default UserApi;
