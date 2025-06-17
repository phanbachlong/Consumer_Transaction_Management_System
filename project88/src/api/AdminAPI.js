import axiosClient from "./axiosClient";

const url = '/admin';

const activeUser = (userID, status) => {
    return axiosClient.put(`${url}/active`, null, { params: { userID, status } });
}

const adminAPI = {
    activeUser
}

export default adminAPI;