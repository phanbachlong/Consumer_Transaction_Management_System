import transactionApi from "../../api/TransactionAPI";

const TransactionService = {
    getTransaction: async (page, size, filter) => {
        return await transactionApi.getTransaction(page, size, filter);
    }
}

export default TransactionService;