import transactionApi from "../../api/TransactionAPI";

const TransactionService = {
    getTransaction: async (userID) => {
        return await transactionApi.getTransaction(userID);
    }
}

export default TransactionService;