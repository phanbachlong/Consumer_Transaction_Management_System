import axiosClient from './axiosClient';
const url = '/users';

const tranfer = (data) => {
    return axiosClient.put(`$(url)/transfer`, data);
}

const UserAPIv2 = {
    tranfer,
};

export default UserAPIv2;