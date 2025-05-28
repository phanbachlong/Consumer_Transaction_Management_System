import axiosClient from './axiosClient';
const url = '/users';

const Transfer = (data) => {
    return axiosClient.put(`${url}/transfer`, data);
}

const FindUserByCardNumber = (cardNumber) => {
    return axiosClient.get(`${url}?cardNumber=${cardNumber}`);
}

const FindUserById = (id) => {
    return axiosClient.get(`${url}/${id}`);
}

const UserAPIv2 = {
    Transfer,
    FindUserByCardNumber,
    FindUserById,
};

export default UserAPIv2;