import { get } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../components/Table";
import { getTransactionByUserID } from "../redux/slices/transactionSlice";

const TransactionModal = ({ user, onClose }) => {

    const initialValues = { "Ngày": "", "Loại": "", "Nội dung": "", "Phí": "", "Số dư": "" };

    const dispatch = useDispatch();
    const { transactionsByUserID, loading, error } = useSelector((state) => state.transactionsByUserID);


    useEffect(() => {

        dispatch(getTransactionByUserID({
            userID: user?.userID, page: 1, size: 5,
            filter: {
                startDate: null,
                endDate: null,
                name: null
            }
        }));
    }, [dispatch, user?.userID]);

    return (
        <div className=" mx-auto p-6 bg-white relative">
            < h2 className="text-xl font-bold mb-4" > Lịch sử giao dịch</ h2>
            <div className="flex items-center bg-gray-100 rounded-lg mb-6 p-4">
                <div>
                    <div className="font-bold text-base">{user?.fullName}</div>
                    <div className="text-gray-600 text-sm">STK: {user?.cardNumber}</div>
                </div>
            </div>

            <Table initialValues={initialValues} content={transactionsByUserID.content || []}></Table>

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