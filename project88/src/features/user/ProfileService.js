import userApi from "../../api/UserApi";

const ProfileService = {
    getProfile: async () => {

        return await userApi.getProfile();
    }
}

export default ProfileService;  