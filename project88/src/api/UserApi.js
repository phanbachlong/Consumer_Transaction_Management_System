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
}

const userApi = new UserApi();
export default userApi;