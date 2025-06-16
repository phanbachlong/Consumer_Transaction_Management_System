import userApi from "../../api/UserApi";
import { getBalance } from "../../redux/slices/userSlice";

const UserService = {
    getAllUsers: async (page, size, filter) => {
        return await userApi.getAllUsers(page, size, filter);
    },

    getBalance: async () => {
        return await userApi.getBalance();
    },

    editUserByEmployee: async (userID, body) => {
        return await userApi.editUserByEmployee(userID, body);
    }

};

export default UserService;