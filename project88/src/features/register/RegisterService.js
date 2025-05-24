import userApi from "../../api/UserApi";


const RegisterService = {
    createUser: async (values) => {
        const userData = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            cccd: values.cccd,
            birth: values.birth,
            gender: values.gender,
            password: values.password
        }

        return await userApi.createUser(userData);
    }
}

export default RegisterService;