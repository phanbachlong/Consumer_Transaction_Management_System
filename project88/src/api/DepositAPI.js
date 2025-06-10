import axiosClient from "./axiosClient";

const url = '/deposits';

const getDeposit = () => {
    return axiosClient.get(`${url}/user`);
}

const redeemDeposit = (depositID) => {
    axiosClient.put(`${url}/${depositID}/redeem`, {
        // body: JSON.stringify({
        //     redeemDate: new Date().toISOString().split("T")[0],
        //     interestAmount: currentInterest,
        //     userId: userId,
        // }),
    })
}

const DepositAPI = {
    getDeposit,
    redeemDeposit
}



export default DepositAPI;

