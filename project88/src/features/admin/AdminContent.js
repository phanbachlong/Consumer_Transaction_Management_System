import React, { useState } from "react";
import TopUp from "../home/TopUp";
import EmployeeList from "./EmployeeList";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import { useSelector } from "react-redux";
import EditUserModal from "../../components/EditUserModal";




const AdminContent = () => {
    // // State cho ô tìm kiếm (search)
    // const [search, setSearch] = useState("");
    const [showTopUp, setShowTopUp] = useState(false);
    const [params, setParams] = useState('');
    const [isReset, setIsReset] = useState(false)
    const [page, setPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEdit, setShowEdit] = useState(false);



    const { totalElements, totalPages, currentPage } = useSelector((state) => state.employee);


    const onPageChange = (currentPage) => {
        setPage(currentPage);
    }

    const handleResetTable = () => {
        setIsReset(true);
        setParams("");
        setTimeout(() => setIsReset(false), 0);
    }

    const isActive = (user) => {

        console.log(user);
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
                    <EmployeeList currentPage={page} params={params} isActive={isActive}></EmployeeList>
                    {/* Page */}
                    <div className="flex justify-between items-center mt-4">
                        <button className="px-4 py-2 bg-gray-100 bg-red-100 text-red-600 rounded hover:bg-red-200" onClick={handleResetTable}>
                            Tải lại
                        </button>
                        <Pagination totalPages={totalPages} currentPage={page} onPageChange={onPageChange}></Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminContent;
