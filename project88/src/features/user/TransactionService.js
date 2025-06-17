import transactionApi from "../../api/TransactionAPI";
import { getTransactionByUserID } from "../../redux/slices/transactionSlice";

const TransactionService = {
    getTransaction: async (page, size, filter) => {
        return await transactionApi.getTransaction(page, size, filter);
    },

    getTransactionByUserID: async (userID, page, size, filter) => {
        return await transactionApi.getTransactionByUserID(userID, page, size, filter);
    }
}

export default TransactionService;