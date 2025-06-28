import React, { useCallback, useEffect, useState } from "react";
import TopUp from "../home/TopUp";
import EmployeeList from "./EmployeeList";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import EditUserModal from "../../components/EditUserModal";
import adminAPI from "../../api/AdminAPI";
import { getAllEmployees, getEmployeeByUsername } from "../../redux/slices/employeeSlice";




const AdminContent = () => {
    // // State cho ô tìm kiếm (search)
    // const [search, setSearch] = useState("");
    const [showTopUp, setShowTopUp] = useState(false);
    const [params, setParams] = useState('');
    const [isReset, setIsReset] = useState(false)
    const [page, setPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEdit, setShowEdit] = useState(false);

    const dispatch = useDispatch();

    const { totalElements, totalPages, currentPage } = useSelector((state) => state.employee);

    const onPageChange = (currentPage) => {
        setPage(currentPage);
    }

    const handleResetTable = () => {
        setIsReset(true);
        setParams("");
        setTimeout(() => setIsReset(false), 0);
    }

    const isActive = useCallback(async (user) => {
        const newStatus = user.status === "ACTIVE" ? "NOT_ACTIVE" : "ACTIVE";
        try {
            await adminAPI.activeUser(user.userID, newStatus);
            await dispatch(getAllEmployees({ page: page, size: 5, filter: { name: params } }));

        } catch (error) {
            console.error("Error updating user status:", error);
        }
    }, [dispatch, page, params])

    useEffect(() => {
        dispatch(getEmployeeByUsername());
    }, [dispatch])

    const { employeeByUsername } = useSelector((state) => state.employee);

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Main content */}
            <div className="max-w-5xl mx-auto mt-8">
                {/* NV info */}
                <div className="flex items-center bg-white rounded p-6 mb-8 gap-8">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-orange-500 text-2xl font-bold">
                            <img src={employeeByUsername.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <span className="text-lg font-semibold">Admin: {employeeByUsername.firstName} {employeeByUsername.lastName}</span>
                    </div>
                    <button className="px-6 py-2 rounded bg-orange-400 text-black-300 font-semibold border border-orange-400">
                        Nhân viên mới +
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
}

export default AdminContent;
