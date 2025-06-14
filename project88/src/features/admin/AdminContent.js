import React, { useState } from "react";
import TopUp from "../home/TopUp";
import EmployeeList from "./EmployeeList";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import { useSelector } from "react-redux";




const AdminContent = () => {
    // // State cho ô tìm kiếm (search)
    // const [search, setSearch] = useState("");
    const [showTopUp, setShowTopUp] = useState(false);
    const [params, setParams] = useState('');
    const [isReset, setIsReset] = useState(false)
    const [page, setPage] = useState(1);

    const { totalElements, totalPages, currentPage } = useSelector((state) => state.employee);


    const onPageChange = (currentPage) => {
        setPage(currentPage);
    }

    const handleResetTable = () => {
        setIsReset(true);
        setParams("");
        setTimeout(() => setIsReset(false), 0);
    }

    // const [customers, setCustomers] = useState(customersLists);
    // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    // const [customerToDelete, setCustomerToDelete] = useState(null);

    // // Hàm xử lý xóa nhân viên
    // const handleDeleteClick = (customer) => {
    //     setCustomerToDelete(customer);
    //     setShowDeleteConfirm(true);
    // };

    // const confirmDelete = () => {
    //     if (customerToDelete) {
    //         setCustomers(customers.filter(c => c.id !== customerToDelete.id));
    //         setShowDeleteConfirm(false);
    //         setCustomerToDelete(null);
    //         alert("Đã xóa thành công!");
    //     }
    // };

    // const cancelDelete = () => {
    //     setShowDeleteConfirm(false);
    //     setCustomerToDelete(null);
    // };

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
                        <div className="text-lg font-bold">Danh sách nhân viên</div>
                        <div className="flex items-center gap-2">
                            <Search onChangeSearch={setParams} isReset={isReset}></Search>
                        </div>
                    </div>
                    <EmployeeList currentPage={page} params={params}></EmployeeList>
                    {/* Page */}
                    <div className="flex justify-between items-center mt-4">
                        <button className="px-4 py-2 bg-gray-100 bg-red-100 text-red-600 rounded hover:bg-red-200" onClick={handleResetTable}>
                            Tải lại
                        </button>
                        <Pagination totalPages={totalPages} currentPage={page} onPageChange={onPageChange}></Pagination>
                    </div>
                </div>
            </div>
            {showTopUp && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <TopUp onClose={() => setShowTopUp(false)} />
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {/* {showDeleteConfirm && (
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
            )} */}
        </div>
    );
};

export default AdminContent;
