import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useDispatch, useSelector } from 'react-redux';
import { transaction } from "../../redux/slices/transactionSlice";


const Transaction = () => {

    const dispatch = useDispatch();

    const initialValues = { "Ngày": "", "Loại": "", "Nội dung": "", "Phí": "", "Số dư": "" };
    const { transactions, loading, error } = useSelector((state) => state.transaction);


    useEffect(() => {
        dispatch(transaction(1))
    }, [dispatch])


    return (
        <div>
            <Table initialValues={initialValues} content={transactions?.content || []}></Table>
        </div>
    )
}

export default Transaction;