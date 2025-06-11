import userApi from "../../api/UserApi";
import { getBalance } from "../../redux/slices/userSlice";

const UserService = {
    getAllUsers: async (page, size, filter) => {
        return await userApi.getAllUsers(page, size, filter);
    },

    getBalance: async () => {
        return await userApi.getBalance();
    }
};

export default UserService;