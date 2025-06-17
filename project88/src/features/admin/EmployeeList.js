import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees } from '../../redux/slices/employeeSlice';
import { filter } from 'lodash';
import Table from '../../components/Table';

const EmployeeList = ({ params, currentPage, isActive }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [searchTerm, setSearchTerm] = useState('');

    const { employees, loading, error } = useSelector((state) => state.employee);



    useEffect(() => {
        // reset về page 1 nếu là tìm kiếm
        currentPage = 1;
    }, [params]);

    useEffect(() => {
        dispatch(getAllEmployees({ page: currentPage, size: 5, filter: { name: params } }));
    }, [dispatch, currentPage, params]);

    const initialValues = { "Mã NV": "", "Nhân viên": "", "Username": "", "Email": "", "SDT": "", "Số tài khoản": "", "Active": "" }


    return (
        <div>
            <Table initialValues={initialValues} content={employees} isActive={isActive} ></Table>
        </div>
    );
};

export default EmployeeList;
