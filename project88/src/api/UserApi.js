import axiosClient from './axiosClient';

class UserApi {
    constructor() {
        this.url = '/users'
    }

    createUser = (body) => {
        axiosClient.post(this.url, body)
    }

    getProfile = () => {
        return axiosClient.get(`${this.url}/profile`);
    }

    getAllUsers = () => {
        return axiosClient.get(`${this.url}/all`);
    }

    topUp = (body) => {
        return axiosClient.post("/users/top-up", body);
    };

    updateProfile = (body) => {
        return axiosClient.put(`${this.url}/profile`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

}

const userApi = new UserApi();
export default userApi;
