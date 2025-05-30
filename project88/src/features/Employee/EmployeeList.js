import React, { useState } from 'react';
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";

// Employee List Component
const EmployeeList = ({ onCreateNew, onEdit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Sample data - replace with actual API data
    const employees = [
        {
            id: 'HA10022',
            username: 'HuyNV',
            firstName: 'Huy',
            lastName: 'Nguyễn Văn',
            identification: '123456789',
            email: 'ABC@gmail.com',
            phoneNumber: '0912345678',
            gender: 'Male' // Changed from address to gender
        },
        {
            id: 'HA10022',
            username: 'HoangNV',
            firstName: 'Hoàng',
            lastName: 'Nguyễn Văn',
            identification: '123456789',
            email: 'ABC@gmail.com',
            phoneNumber: '0987654321',
            gender: 'Male' // Changed from address to gender
        },
        {
            id: 'HA10022',
            username: 'Tung11',
            firstName: 'Tùng',
            lastName: 'Trần Văn',
            identification: '123456789',
            email: 'ABC@gmail.com',
            phoneNumber: '0901234567',
            gender: 'Male' // Changed from address to gender
        },
        {
            id: 'HA10022',
            username: 'HaNT',
            firstName: 'Hà',
            lastName: 'Nguyễn Thị',
            identification: '123456789',
            email: 'ABC@gmail.com',
            phoneNumber: '0976543210',
            gender: 'Female' // Changed from address to gender
        },
        {
            id: 'HA10022',
            username: 'DungDT',
            firstName: 'Dung',
            lastName: 'Đặng Thị',
            identification: '123456789',
            email: 'ABC@gmail.com',
            phoneNumber: '0923456789',
            gender: 'Female' // Changed from address to gender
        }
    ];

    const filteredEmployees = employees.filter(emp =>
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.gender.toLowerCase().includes(searchTerm.toLowerCase()) // Updated to search by gender
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/*/!* Header *!/*/}
            {/*<div className="bg-white shadow-sm border-b">*/}
            {/*    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">*/}
            {/*        <div className="text-2xl font-bold text-orange-500">LOGO</div>*/}
            {/*        <div className="flex items-center space-x-4">*/}
            {/*            <span className="text-gray-600">Light/Dark</span>*/}
            {/*            <div className="flex flex-col items-center">*/}
            {/*                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-orange-500 font-semibold">*/}
            {/*                    AVA*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* User Info */}
            <div className="bg-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-4 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-orange-500 font-bold text-lg">
                        AVA
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Thanhtung18298(ADMIN)</h2>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Title and Search */}
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
                            onClick={onCreateNew}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Thêm Mới</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                {/* Removed overflow-x-auto and relative from this div */}
                <div className="bg-white rounded-lg shadow">
                    <table className="min-w-full"> {/* Changed back to min-w-full, table-auto is not strictly needed if not overflowing */}
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Identification</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th> {/* Changed from Address to Gender */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> {/* Removed sticky */}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEmployees.map((employee, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.firstName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.lastName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.identification}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.phoneNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.gender}</td> {/* Changed from Address to Gender */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {/* Removed sticky */}
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onEdit(employee)}
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

                {/* Pagination */}
                {/* Removed the progress bar div */}
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

// Main App Component (remains unchanged)
const EmployeeManager = () => {
    const [currentView, setCurrentView] = useState('list');
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleCreateNew = () => {
        setCurrentView('create');
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setCurrentView('edit');
    };

    const handleCancel = () => {
        setCurrentView('list');
        setSelectedEmployee(null);
    };

    const handleSave = (formData) => {
        console.log('Saving employee data:', formData);
        // Here you would typically make an API call to save the data

        setCurrentView('list');
        setSelectedEmployee(null);
    };

    return (
        <div>
            {currentView === 'list' && (
                <EmployeeList onCreateNew={handleCreateNew} onEdit={handleEdit} />
            )}
            {currentView === 'create' && (
                <CreateEmployee onCancel={handleCancel} onSave={handleSave} />
            )}
            {currentView === 'edit' && (
                <EditEmployee employee={selectedEmployee} onCancel={handleCancel} onSave={handleSave} />
            )}
        </div>
    );
};

export default EmployeeManager;