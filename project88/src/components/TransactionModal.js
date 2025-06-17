import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../components/Table";
import { getTransactionByUserID } from "../redux/slices/transactionSlice";
import MyDatePicker from "./MyDatePicker";
import Search from "./Search";
import Pagination from "./Pagination";

const TransactionModal = ({ user, onClose }) => {

    const initialValues = { "Ngày": "", "Loại": "", "Nội dung": "", "Phí": "", "Số dư": "" };

    const dispatch = useDispatch();
    const { transactionsByUserID, totalPages, currentPage, loading, error } = useSelector((state) => state.transactionsByUserID);


    const [params, setParams] = useState('');
    const [isReset, setIsReset] = useState(false);
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Ngày bắt đầu và kết thúc cho ngày hôm nay
    const today = new Date();
    const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const endToday = new Date(today);
    endToday.setHours(23, 59, 59, 999);

    useEffect(() => {
        dispatch(getTransactionByUserID({
            userID: user?.userID, page: page, size: 5,
            filter: {
                startDate: startDate,
                endDate: endDate,
                name: params
            }
        }));
    }, [dispatch, user?.userID, params, page, startDate, endDate]);


    const handleResetTable = () => {
        setIsReset(true);
        setParams("");
        setStartDate(null);
        setEndDate(null);
        setPage(1);
        setTimeout(() => setIsReset(false), 0);
    }

    useEffect(() => {
        setPage(1);
    }, [params, startDate, endDate]);

    const onPageChange = (currentPage) => {
        setPage(currentPage);
    }

    return (
        <div className=" mx-auto p-6 bg-white relative">
            < h2 className="text-xl font-bold mb-4" > Lịch sử giao dịch</ h2>
            <div className="flex items-center bg-gray-100 rounded-lg mb-6 p-4">
                <div>
                    <div className="font-bold text-base">{user?.fullName}</div>
                    <div className="text-gray-600 text-sm">STK: {user?.cardNumber}</div>
                </div>
            </div>
            <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500">Từ ngày:</span>
                    <MyDatePicker value={startDate} onChange={(date) => { setStartDate(date) }} typeDate={startToday}></MyDatePicker>
                    <span className="text-gray-500">đến</span>
                    <MyDatePicker value={endDate} onChange={(date) => setEndDate(date)} typeDate={endToday}></MyDatePicker>
                </div>
                <Search onChangeSearch={setParams} isReset={isReset}></Search>
            </div>

            <Table initialValues={initialValues} content={transactionsByUserID.content || []}></Table>

            {/* Page */}
            <div className="flex justify-between items-center mt-4">
                <button className="px-4 py-2 bg-gray-100 bg-red-100 text-red-600 rounded hover:bg-red-200" onClick={handleResetTable}>
                    Tải lại
                </button>
                <Pagination totalPages={totalPages} currentPage={page} onPageChange={onPageChange} />
            </div>
            <button
                type="button"
                className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => onClose(false)}
            >
                Đóng
            </button>
        </div >
    )
}

export default TransactionModal;