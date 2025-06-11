import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useDispatch, useSelector } from 'react-redux';
import { transaction } from "../../redux/slices/transactionSlice";
import { set } from "lodash";
import { current } from "@reduxjs/toolkit";


const Transaction = ({ params, startDate, endDate, currentPage }) => {

    const dispatch = useDispatch();

    const initialValues = { "Ngày": "", "Loại": "", "Nội dung": "", "Phí": "", "Số dư": "" };
    const { transactions, loading, error } = useSelector((state) => state.transaction);
    const [size, setSize] = useState(5);


    useEffect(() => {
        // reset về page 1 nếu là tìm kiếm
        currentPage = 1;
    }, [params, startDate, endDate]);

    useEffect(async () => {
        await dispatch(transaction({ page: currentPage, size, filter: { startDate: startDate, endDate: endDate, name: params } }))

    }, [dispatch, startDate, endDate, currentPage, size, params]);


    return (
        <div>
            <Table initialValues={initialValues} content={transactions || []}></Table>
        </div>
    )
}

export default Transaction;