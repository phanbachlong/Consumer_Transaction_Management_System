import React from "react";

const savings = [
    {
        name: "Tiết kiệm đại chúng",
        principal: "90.000.000",
        interest: "1.234.565",
        term: 12,
        daysLeft: 33,
    },
    {
        name: "Tiết kiệm T5'2025",
        principal: "80.000.000",
        interest: "1.334.565",
        term: 6,
        daysLeft: 28,
    },
    {
        name: "Tiết kiệm T6'2025",
        principal: "70.000.000",
        interest: "1.434.565",
        term: 6,
        daysLeft: 16,
    },
    {
        name: "Tiết kiệm T7'2025",
        principal: "60.000.000",
        interest: "1.534.565",
        term: 3,
        daysLeft: 2,
    },
];

export default function Redeem({setShowRedeem}) {
    return (
        <div className="max-w-4xl mx-auto mt-8 rounded-lg overflow-hidden flex flex-col" style={{background: "#fff"}}>
            {/* Header */}
            <div className="text-2xl font-bold px-6 py-5 text-center">
                Tổng tiền gốc và lãi: <span className="text-[#E65100]">1.000.000.000</span>
            </div>
            {/* Table */}
            <div className="px-2 sm:px-6 py-2 bg-white">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-500 border-b">
                            <th className="py-3 px-2 font-medium">Tên sổ tiết kiệm</th>
                            <th className="py-3 px-2 font-medium">Tiền gốc</th>
                            <th className="py-3 px-2 font-medium">Tiền lãi tới hiện tại</th>
                            <th className="py-3 px-2 font-medium">Kỳ hạn (Tháng)</th>
                            <th className="py-3 px-2 font-medium">Số ngày còn lại</th>
                            <th className="py-3 px-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {savings.map((item, idx) => (
                            <tr key={idx} className="border-b last:border-b-0">
                                <td className="py-4 px-2">{item.name}</td>
                                <td className="py-4 px-2">{item.principal}</td>
                                <td className="py-4 px-2">{item.interest}</td>
                                <td className="py-4 px-2">{item.term}</td>
                                <td className="py-4 px-2">{item.daysLeft}</td>
                                <td className="py-4 px-2">
                                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                                        Tất toán
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mx-auto mb-4"
                onClick={() => setShowRedeem(false)}
            >       
                Đóng
            </button>
        </div>
    );
}