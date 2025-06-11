import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees } from '../../redux/slices/employeeSlice';
import { filter } from 'lodash';
import Table from '../../components/Table';

const EmployeeList = ({ params, currentPage }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [searchTerm, setSearchTerm] = useState('');

    const { employees, loading, error } = useSelector((state) => state.employee);



    useEffect(() => {
        // reset về page 1 nếu là tìm kiếm
        currentPage = 1;
    }, [params]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                await dispatch(getAllEmployees({ page: 0, size: 5, filter: { name: params } }));
            } catch (err) {
                console.error("Failed to fetch employees:", err);
            } finally {
            }
        };
        fetchEmployees();
    }, [dispatch, currentPage, params]);

    const initialValues = { "Nhân viên": "", "Username": "", "Email": "", "SDT": "", "Số tài khoản": "", "Thao tác": "" }

    // const handleCreateNew = () => {
    //     navigate('/create-employee');
    // };

    // const handleEdit = (employee) => {
    //     console.log('Chỉnh sửa nhân viên:', employee.userID);
    //     navigate(`/edit-employee/${employee.userID}`, { state: employee });
    // };

    // const handleToggleStatus = async (userID) => {
    //     try {
    //         // Đảo trạng thái ACTIVE <-> NOT_ACTIVE
    //         const updatedEmployees = employees.map(emp => {
    //             if (emp.userID === userID) {
    //                 return {
    //                     ...emp,
    //                     status: emp.status === 'ACTIVE' ? 'NOT_ACTIVE' : 'ACTIVE'
    //                 };
    //             }
    //             return emp;
    //         });
    //         setEmployees(updatedEmployees);

    //         const newStatus = updatedEmployees.find(emp => emp.userID === userID).status;
    //         // Chuyển trạng thái sang số tương ứng nếu backend cần (0 hoặc 1)
    //         const statusNumber = newStatus === 'ACTIVE' ? 1 : 0;

    //         await fetch(`http://localhost:8080/api/v1/employees/${userID}/status`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ status: statusNumber }),
    //         });
    //     } catch (error) {
    //         console.error('Lỗi khi cập nhật trạng thái:', error);
    //     }
    // };

    // Hàm mới xử lý xóa (đổi status thành 2)
    // const handleDelete = async (userID) => {
    //     try {
    //         // Gọi API cập nhật status = 2 (đã xóa)
    //         await fetch(`http://localhost:8080/api/v1/employees/${userID}/status`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ status: 2 }),
    //         });

    //         // Cập nhật state: loại bỏ nhân viên đã bị xóa khỏi danh sách hiện tại
    //         setEmployees(prevEmployees => prevEmployees.filter(emp => emp.userID !== userID));
    //     } catch (error) {
    //         console.error('Lỗi khi xóa nhân viên:', error);
    //     }
    // };



    return (
        <div>
            <Table initialValues={initialValues} content={employees}></Table>
        </div>
    );
};

export default EmployeeList;
