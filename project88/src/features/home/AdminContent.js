import React, { useState } from "react";
import TopUp from "./TopUp";

const customersLists = [
    {
        id: "NV1011",
        date: "04/05/2025",
        name: "Bùi Quang Huy",
        account: "1234********",
        address: "Thanh Chì, Hà Nội",
    },
    {
        id: "NV1012",
        date: "04/05/2025",
        name: "Nguyễn Văn A",
        account: "1234********",
        address: "Thanh Chì, Hà Nội",
    },
    {
        id: "NV1013",
        date: "04/05/2025",
        name: "Trần Văn B",
        account: "1234********",
        address: "Thanh Chì, Hà Nội",
    },
    {
        id: "NV1014",
        date: "04/05/2025",
        name: "Nguyễn Thị C",
        account: "1234********",
        address: "Thanh Chì, Hà Nội",
    },
    {
        id: "NV1015",
        date: "04/05/2025",
        name: "Đặng thị D",
        account: "1234********",
        address: "Thanh Chì, Hà Nội",
    },
];

const AdminContent = () => {
    // State cho ô tìm kiếm (search)
    const [search, setSearch] = useState("");
    const [showTopUp, setShowTopUp] = useState(false);
    
    const [customers, setCustomers] = useState(customersLists);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);

    // Hàm xử lý xóa nhân viên
    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        if (customerToDelete) {
            setCustomers(customers.filter(c => c.id !== customerToDelete.id));
            setShowDeleteConfirm(false);
            setCustomerToDelete(null);
            alert("Đã xóa thành công!");
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setCustomerToDelete(null);
    };

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Main content */}
            <div className="max-w-5xl mx-auto mt-8">
                {/* NV info */}
                <div className="flex items-center bg-white rounded p-6 mb-8 gap-8">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-orange-500 text-2xl font-bold">
                            AVA
                        </div>
                        <span className="text-lg font-semibold">Admin</span>
                    </div>
                    <button className="px-6 py-2 rounded bg-orange-200 text-orange-800 font-semibold border border-orange-400">
                        Quản lý NV
                    </button>
                </div>

                {/* NV list */}
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
                                <th className="py-2 font-semibold">ID NV</th>
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

                                        {/* Top Up icon */}
                                        <button
                                            type="button"
                                            className="flex items-center justify-center p-1 rounded-full hover:bg-gray-200 active:bg-gray-300 transition"
                                            title="Giao dịch"
                                            onClick={() => setShowTopUp(true)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>
                                        {/* Delete icon */}
                                        <button
                                            type="button"
                                            className="flex items-center justify-center p-1 rounded-full hover:bg-red-100 active:bg-red-200 transition text-red-600"
                                            title="Xóa tài khoản"
                                            onClick={() => handleDeleteClick(c)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916C15.75 2.253 14.247.75 12 .75S8.25 2.253 8.25 4.5v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
            {/* Top Up Modal */}
            {showTopUp && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <TopUp onClose={() => setShowTopUp(false)} />
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Xác nhận xóa tài khoản</h3>
                                <p className="text-sm text-gray-600">Hành động này không thể hoàn tác</p>
                            </div>
                        </div>
                        
                        {customerToDelete && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-700">Thông tin khách hàng:</p>
                                <p className="text-sm text-gray-600">ID: {customerToDelete.id}</p>
                                <p className="text-sm text-gray-600">Tên: {customerToDelete.name}</p>
                                <p className="text-sm text-gray-600">Số TK: {customerToDelete.account}</p>
                            </div>
                        )}

                        <p className="text-gray-700 mb-6">
                            Bạn có chắc chắn muốn xóa tài khoản khách hàng <strong>{customerToDelete?.name}</strong> không?
                        </p>
                        
                        <div className="flex gap-3">
                            <button
                                onClick={cancelDelete}
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                                Xóa tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminContent;
