import userApi from "../../api/UserApi";

const UserService = {
    getAllUsers: async () => {
        return await userApi.getAllUsers();
    }
};

export default UserService;