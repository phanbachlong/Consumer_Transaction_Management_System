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

const GetBillsByUserId = (userId) => {
    return axiosClient.get(`${url}/bills`, { params: { userId } });
}

const PayBill = (billId) => {
    return axiosClient.put(`${url}/bills?billId=${billId}`);
}

const UserAPIv2 = {
    Transfer,
    FindUserByCardNumber,
    FindUserById,
    GetBillsByUserId,
    PayBill,
};

export default UserAPIv2;