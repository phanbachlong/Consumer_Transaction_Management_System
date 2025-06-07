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

const transactionApi = {
    getTransaction,
};

export default transactionApi;
