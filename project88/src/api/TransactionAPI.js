import api from "./axiosClient";

const url = '/transaction'

const getTransaction = (page, size, filter) => {
    return api.get(url, {
        params: {
            page,
            size,
            ...filter
        },
    });
}

const getTransactionByUserID = (userID, page, size, filter) => {
    return api.get(`${url}/user`, { params: { userID, page, size, ...filter } });
}

const transactionApi = {
    getTransaction,
    getTransactionByUserID
};

export default transactionApi;
