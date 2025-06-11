import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit } from "../../redux/slices/depositSlice";

const SavingTotal = () => {

    const { deposits, loading, error } = useSelector(state => state.deposit);
    const [savingsTotal, setSavingsTotal] = useState(0);

    const dispatch = useDispatch();

    const formatAmount = (value) => {
        const cleanValue = value.toString().replace(/[^0-9]/g, "");
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const formatCurrency = (amount) => {
        return formatAmount(amount.toString()) + " VND";
    };


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
            console.log(data);


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
            <div className="text-2xl font-bold">{formatCurrency(savingsTotal)}</div>
            <div className="flex justify-between space-x-4 mt-2">
                <button className="w-1/2 h-12 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 overflow-hidden whitespace-nowrap text-ellipsis"
                // onClick={() => setShowDeposit(true)}
                >
                    Gửi
                </button>
                <button className=" w-1/2 h-12 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 overflow-hidden whitespace-nowrap text-ellipsis"
                // onClick={() => setShowRedeem(true)}
                >
                    Rút
                </button>
            </div>
        </div>
    )

}

export default SavingTotal;