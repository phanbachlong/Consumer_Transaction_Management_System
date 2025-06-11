import axiosClient from "./axiosClient";

const url = '/deposits';

const getDeposit = () => {
    return axiosClient.get(`${url}/user`);
}

const DepositAPI = {
    getDeposit
}

export default DepositAPI;