import React, { useState } from "react";
import TopUp from "./TopUp";
import UsersList from "../user/UsersList";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import { useSelector } from "react-redux";

const EmployeeContent = () => {
    // State cho ô tìm kiếm (search)
    const [search, setSearch] = useState("");
    const [showTopUp, setShowTopUp] = useState(false);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const [params, setParams] = useState('');
    const [isReset, setIsReset] = useState('false');
    const [page, setPage] = useState(1)

    const { totalPages, currentPage } = useSelector((state) => state.user);


    const onChangePage = (currentPage) => {
        setPage(currentPage)
    }

    const handleResetTable = () => {
        setIsReset(true);
        setTimeout(() => setIsReset(false), 0);
    }

    // Hàm xử lý xóa khách hàng
    const handleDeleteClick = (customer) => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        if (customerToDelete) {
            setShowDeleteConfirm(false);
            setCustomerToDelete(null);
            alert("Đã xóa thành công!");
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setCustomerToDelete(null);
    };


    const openTopUpModal = (user) => {
        setSelectedUser(user);
        setShowTopUp(true);
    };


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
                            <Search onChangeSearch={setParams} isReset={isReset} />
                            {/* Search icon */}
                            <button
                                type="button"
                                className="flex items-center justify-center p-1 rounded-full hover:bg-gray-300 active:bg-gray-400 transition"
                                title="Tìm kiếm"
                            >
                            </button>
                        </div>
                    </div>
                    <UsersList onTopUp={openTopUpModal} currentPage={page} params={params} />
                    <div className="flex justify-between items-center mt-4">
                        <button className="px-4 py-2 bg-gray-100 bg-red-100 text-red-600 rounded hover:bg-red-200" onClick={handleResetTable}>
                            Tải lại
                        </button>
                        <Pagination totalPages={totalPages} onPageChange={onChangePage}></Pagination>
                    </div>



                </div>
            </div>
            {/* Top Up Modal */}
            {showTopUp && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">

                        <TopUp user={selectedUser} onClose={() => setShowTopUp(false)} />


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

export default EmployeeContent;
