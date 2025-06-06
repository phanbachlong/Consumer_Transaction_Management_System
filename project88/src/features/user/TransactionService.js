import transactionApi from "../../api/TransactionAPI";

const TransactionService = {
    getTransaction: async (userID, page, size, filter) => {
        return await transactionApi.getTransaction(userID, page, size, filter);
    }
}

export default TransactionService;