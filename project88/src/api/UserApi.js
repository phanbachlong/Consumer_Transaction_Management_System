import axiosClient from './axiosClient';

class UserApi {
    constructor() {
        this.url = '/users'
    }

    createUser = (body) => {
        axiosClient.post(this.url, body)
    }
}

const userApi = new UserApi();
export default userApi;