import React, { useState } from "react";

const Deposite = ({ setShowDeposite }) => {
    // State cho các trường input
    const [accountName, setAccountName] = useState("TK T5 2025");
    const [amount, setAmount] = useState("5.000.000");
    const [term, setTerm] = useState("1");
    const interestRate = "6.2%";

    const handleDeposite = (e) => {
        e.preventDefault();
        alert("Gửi tiền thành công");
        console.log("Deposit confirmed");
        console.log({
            accountName,
            amount,
            term,
            interestRate
        });
        setShowDeposite(false);
    }

    return (
        <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow p-0">
            {/* Balance Header */}
            <div className="text-2xl font-bold px-6 py-5 text-center">
                Số dư khả dụng: <span className="text-[#E65100]">1.000.000.000</span>
            </div>
            {/* Form */}
            <form className="p-8 space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Tên sổ tiết kiệm</label>
                    <input
                        type="text"
                        value={accountName}
                        onChange={e => setAccountName(e.target.value)}
                        className="w-full rounded bg-gray-50 border border-gray-200 px-4 py-2 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Số tiền muốn gửi</label>
                    <input
                        type="text"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="w-full rounded bg-gray-50 border border-gray-200 px-4 py-2 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Kỳ hạn (Tháng)</label>
                    <select
                        className="w-full rounded bg-gray-50 border border-gray-200 px-4 py-2 focus:outline-none"
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                    >
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="12">12</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Lãi suất</label>
                    <input
                        type="text"
                        value={interestRate}
                        readOnly
                        className="w-full rounded bg-red-50 border border-gray-200 px-4 py-2 text-red-600 font-semibold focus:outline-none"
                    />
                </div>
                {/* Buttons */}
                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        onClick={() => setShowDeposite(false)}
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={handleDeposite}
                    >
                        Xác nhận
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Deposite;