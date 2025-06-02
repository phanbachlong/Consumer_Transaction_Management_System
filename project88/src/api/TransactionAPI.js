import api from "./axiosClient";

const url = '/transaction'

const getTransaction = (userID) => {
    return api.get(url, { params: { userID } })
}

const transactionApi = {
    getTransaction,
};

export default transactionApi;
