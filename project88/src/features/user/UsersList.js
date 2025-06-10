import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";
import Table from "../../components/Table";


const UserList = ({ onTopUp, params, currentPage }) => {
    const dispatch = useDispatch();
    const [size, setSize] = useState(5);

    const initialValues = {
        "ID": "",
        "Tên": "",
        "Email": "",
        "Số điện thoại": "",
        "Số thẻ": "",
        "Thao tác": ""
    };

    const { users, loading, error } = useSelector((state) => state.user);
    console.log(users);


    useEffect(() => {
        dispatch(getAllUsers({ page: currentPage, size: size, filter: { name: params } }));
    }, [dispatch, currentPage, size, params]);

    return (
        <div>
            <Table
                initialValues={initialValues}
                content={users.content || []}
                onTopUp={onTopUp}
            />
        </div>
    );
};

export default UserList;
