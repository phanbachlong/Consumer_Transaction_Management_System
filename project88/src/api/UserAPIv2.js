import axiosClient from './axiosClient';
const url = '/users';

const Transfer = (data) => {
    return axiosClient.put(`${url}/transfer`, data);
}

const FindUserByCardNumber = (cardNumber) => {
    return axiosClient.get(`${url}?cardNumber=${cardNumber}`);
}

const UserAPIv2 = {
    Transfer,
    FindUserByCardNumber,
};

export default UserAPIv2;