import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit } from "../../redux/slices/depositSlice";
import Deposit from "./Deposit";
import Redeem from "../home/Redeem";

const SavingTotal = (onAfterDeposit) => {

    const { deposits, loading, error } = useSelector(state => state.deposit);
    const [savingsTotal, setSavingsTotal] = useState(0);

    const [showDeposit, setShowDeposit] = useState(false);
    const [showRedeem, setShowRedeem] = useState(false);

    const dispatch = useDispatch();

    const calculateInterest = (depositAmount, interestRate, createDate) => {
        const startDate = new Date(createDate);
        const now = new Date();

        startDate.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);

        const daysPassed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        const actualDaysPassed = Math.max(0, daysPassed);

        const yearlyInterest = (depositAmount * interestRate) / 100;
        const dailyInterest = yearlyInterest / 365;

        return Math.round(dailyInterest * actualDaysPassed);
    };

    useEffect(() => {
        const fetchSavingTotal = async () => {
            const res = await dispatch(deposit())
            const data = res.payload;

            const total = data.reduce((sum, d) => {
                const principal = d.depositAmount || d.amount || 0;
                const interest = calculateInterest(
                    principal,
                    d.interestRate || 0,
                    d.createDate
                );
                return sum + principal + interest;
            }, 0)
            setSavingsTotal(total)
        }
        fetchSavingTotal();
    }, [dispatch])


    return (
        <div className="flex-1 text-center bg-white p-6 rounded shadow">
            <div className="text-gray-500 ">Tiết kiệm</div>
            <div className="text-2xl font-bold">{Number(savingsTotal).toLocaleString("de-DE")} VND</div>
            <div className="flex justify-between space-x-4 mt-2">
                <button className="w-1/2 h-12 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 overflow-hidden whitespace-nowrap text-ellipsis"
                    onClick={() => setShowDeposit(true)}
                >
                    Gửi
                </button>
                <button className=" w-1/2 h-12 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 overflow-hidden whitespace-nowrap text-ellipsis"
                    onClick={() => setShowRedeem(true)}
                >
                    Rút
                </button>
            </div>
            {/* Deposit Modal */}
            {showDeposit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="w-full p-6">
                        <Deposit
                            setShowDeposit={setShowDeposit}
                            onAfterDeposit={onAfterDeposit}
                        />
                    </div>
                </div>
            )}

            {/* Redeem Modal */}
            {showRedeem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="w-full p-6">
                        <Redeem
                            setShowRedeem={setShowRedeem}
                            onAfterRedeem={onAfterDeposit}
                        />
                    </div>
                </div>
            )}
        </div>


    )

}

export default SavingTotal;