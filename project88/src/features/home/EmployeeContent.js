import React, { useState } from "react";

const customers = [
    {
        id: "HA10022",
        date: "04/05/2025",
        name: "Bùi Quang Huy",
        account: "1234********",
        address: "Thanh Chì, Hà Nội",
    },
    {
        id: "HA10022",
        date: "04/05/2025",
        name: "Nguyễn Văn A",
        account: "1234********",
        address: "Thanh Chì, Hà Nội",
    },
    {
        id: "HA10022",
        date: "04/05/2025",
        name: "Trần Văn B",
        account: "1234********",
        address: "Thanh Chì, Hà Nội",
    },
    {
        id: "HA10022",
        date: "04/05/2025",
        name: "Nguyễn Thị C",
        account: "1234********",
        address: "Thanh Chì, Hà Nội",
    },
    {
        id: "HA10022",
        date: "04/05/2025",
        name: "Đặng thị D",
        account: "1234********",
        address: "Thanh Chì, Hà Nội",
    },
];

const EmployeeContent = () => {
    // State cho ô tìm kiếm (search)
    const [search, setSearch] = useState("");

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Main content */}
            <div className="max-w-5xl mx-auto mt-8">
                {/* Employee info */}
                <div className="flex items-center bg-white rounded p-6 mb-8 gap-8">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-orange-500 text-2xl font-bold">
                            AVA
                        </div>
                        <span className="text-lg font-semibold">Tên nhân viên</span>
                    </div>
                    <button className="px-6 py-2 rounded bg-orange-200 text-orange-800 font-semibold border border-orange-400">
                        Quản lý KH
                    </button>
                    <button className="px-6 py-2 rounded bg-red-100 text-red-600 font-semibold border border-red-200">
                        Hồ sơ nhân viên
                    </button>
                </div>

                {/* Customer list */}
                <div className="bg-white rounded p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-lg font-bold">Danh sách khách hàng</div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Tìm kiếm khách hàng..."
                                className="w-64 h-8 px-3 rounded-full bg-gray-200 focus:outline-none"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            {/* Search icon */}
                            <button
                                type="button"
                                className="flex items-center justify-center p-1 rounded-full hover:bg-gray-300 active:bg-gray-400 transition"
                                title="Tìm kiếm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 font-semibold">ID KH</th>
                                <th className="py-2 font-semibold">Ngày tạo tài khoản</th>
                                <th className="py-2 font-semibold">Tên tài khoản</th>
                                <th className="py-2 font-semibold">Số tài khoản</th>
                                <th className="py-2 font-semibold">Địa chỉ</th>
                                <th className="py-2 font-semibold">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((c, idx) => (
                                <tr key={idx} className="border-b last:border-0">
                                    <td className="py-2">{c.id}</td>
                                    <td className="py-2">{c.date}</td>
                                    <td className="py-2">{c.name}</td>
                                    <td className="py-2">{c.account}</td>
                                    <td className="py-2">{c.address}</td>
                                    <td className="py-2 flex gap-4">
                                        {/* Edit icon */}
                                        <button
                                            type="button"
                                            className="flex items-center justify-center p-1 rounded-full hover:bg-gray-200 active:bg-gray-300 transition"
                                            title="Chỉnh sửa"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>

                                        {/* Dollar icon */}
                                        <button
                                            type="button"
                                            className="flex items-center justify-center p-1 rounded-full hover:bg-gray-200 active:bg-gray-300 transition"
                                            title="Giao dịch"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Page */}
                    <div className="text-right mt-4">
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                            First
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                            1
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                            2
                        </button>
                        <span className="px-4 py-2">...</span>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                            5
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                            Last
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeContent;
