import api from "./axiosClient";

const url = '/transaction'

const getTransaction = (userID, page, size, filter) => {
    return api.get(url, {
        params: {
            userID,
            page,
            size,
            ...filter
        },
    });
}

const transactionApi = {
    getTransaction,
};

export default transactionApi;
