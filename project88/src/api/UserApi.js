import api from './Api';

class UserApi {
    constructor() {
        this.url = '/users'
    }

    createUser = (body) => {
        api.post(this.url, body)
    }
}

const userApi = new UserApi();
export default userApi;