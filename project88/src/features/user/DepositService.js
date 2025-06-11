import { get } from 'lodash';
import depositApi from '../../api/DepositAPI';

const DepositService = {
    getDeposit: async () => {
        try {
            const response = await depositApi.getDeposit();
            return response.data;
        } catch (error) {
            console.error("Error fetching deposits:", error);
            throw error;
        }
    },
}

export default DepositService;