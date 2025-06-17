import React, { useEffect, useState } from "react";
import TopUp from "../home/TopUp";
import UsersList from "../user/UsersList";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployeeByUsername } from "../../redux/slices/employeeSlice";
import EditUserModal from "../../components/EditUserModal";
import TransactionModal from "../../components/TransactionModal";


const EmployeeContent = () => {
    // State cho ô tìm kiếm (search)
    const [search, setSearch] = useState("");
    const [showTopUp, setShowTopUp] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showTransactionUp, setShowTransactionUp] = useState(false);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const [params, setParams] = useState('');
    const [isReset, setIsReset] = useState('false');
    const [page, setPage] = useState(1)
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { totalPages, currentPage } = useSelector((state) => state.user);

    const { employeeByUsername, loading, error } = useSelector((state) => state.employee);

    useEffect(() => {
        dispatch(getEmployeeByUsername());

    }, [dispatch]);

    const onChangePage = (currentPage) => {
        setPage(currentPage)
    }

    const handleResetTable = () => {
        setIsReset(true);
        setPage(1);
        setTimeout(() => setIsReset(false), 0);
    }

    const handleNavigateProfile = () => {
        navigate('/profile')
    }

    const openTopUpModal = (user) => {
        setSelectedUser(user);
        setShowTopUp(true);
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setShowEdit(true);
    }

    const openTransactionModal = (user) => {
        setSelectedUser(user);
        setShowTransactionUp(true);
    }


    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Main content */}
            <div className="max-w-5xl mx-auto mt-8">
                {/* Employee info */}
                <div className="flex items-center bg-white rounded p-6 mb-8 gap-8">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-orange-500 text-2xl font-bold">
                            <img src={employeeByUsername.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <span className="text-lg font-semibold">{employeeByUsername.firstName} {employeeByUsername.lastName}</span>
                    </div>
                    {/* <button className="px-6 py-2 rounded bg-orange-200 text-orange-800 font-semibold border border-orange-400">
                        Quản lý KH
                    </button> */}
                    <button className="px-6 py-2 rounded bg-red-100 text-red-600 font-semibold border border-red-200" onClick={handleNavigateProfile}>
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
                    <UsersList onTopUp={openTopUpModal} currentPage={page} params={params} onEditUp={openEditModal} openTransactionModal={openTransactionModal} />
                    <div className="flex justify-between items-center mt-4">
                        <button className="px-4 py-2 bg-gray-100 bg-red-100 text-red-600 rounded hover:bg-red-200" onClick={handleResetTable}>
                            Tải lại
                        </button>
                        <Pagination totalPages={totalPages} currentPage={page} onPageChange={onChangePage}></Pagination>
                    </div>



                </div>
            </div>

            {/* Show edit modal */}
            {showEdit && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <EditUserModal user={selectedUser} onClose={() => setShowEdit(false)} />
                    </div>
                </div>
            )}
            {/* Top Up Modal */}
            {showTopUp && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">

                        <TopUp user={selectedUser} onClose={() => setShowTopUp(false)} />
                    </div>
                </div>
            )}

            {/* Transaction modal */}
            {showTransactionUp && (
                <div className="fixed mt-12 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[70%] ">
                        <TransactionModal user={selectedUser} onClose={() => setShowTransactionUp(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeContent;
