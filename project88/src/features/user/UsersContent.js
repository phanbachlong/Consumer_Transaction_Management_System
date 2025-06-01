import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";
import Table from "../../components/Table";


const UsersContent = () => {
    const dispatch = useDispatch();

    const initialValues = { "ID": "", "Tên": "", "Email": "", "Số điện thoại": "", "Số thẻ": "", "Thao tác": "" };
    const { users, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <div>
            <Table initialValues={initialValues} content={users.content || []}></Table>
        </div>
    )
}

export default UsersContent;