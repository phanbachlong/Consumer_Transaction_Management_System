import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/employees');
                const data = await response.json();
                setEmployees(data.content);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };
        fetchEmployees();
    }, []);

    const handleCreateNew = () => {
        navigate('/create-employee');
    };

    const handleEdit = (employee) => {
        console.log('Chỉnh sửa nhân viên:', employee.userID);

        navigate(`/edit-employee/${employee.userID}`, { state: employee });
    };


    const filteredEmployees = employees.filter(emp =>
        emp.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.gender?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Thông tin người dùng */}
            <div className="bg-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-4 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-orange-500 font-bold text-lg">
                        AVA
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Thanhtung18298 (ADMIN)</h2>
                    </div>
                </div>
            </div>

            {/* Nội dung chính */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Thanh tiêu đề + tìm kiếm + thêm mới */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Danh Sách Nhân Viên</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <button
                            onClick={handleCreateNew}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Thêm Mới</span>
                        </button>
                    </div>
                </div>

                {/* Bảng nhân viên */}
                <div className="bg-white rounded-lg shadow">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CCCD</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.userID} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.userID}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.firstName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.cccd}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.gender}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(employee)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang giả */}
                <div className="mt-4 flex justify-end items-center space-x-2">
                    <span className="text-gray-600">First</span>
                    <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">2</button>
                    <span className="text-gray-600">...</span>
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">5</button>
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">6</button>
                    <span className="text-gray-600">Last</span>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
