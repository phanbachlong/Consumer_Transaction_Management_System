import api from "./axiosClient";

class TransactionApi {
    constructor() {
        this.url = '/transaction'
    }

    getTransaction = (userID) => {
        return api.get(this.url, { params: { userID } })
    }
}

const transactionApi = new TransactionApi();
export default transactionApi;
