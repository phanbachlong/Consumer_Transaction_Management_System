import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userID: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        gender: '',
        phone: '',
        cccd: '',
        birth: '',
        password: '',
        role: '',
        status: '',
        avatarUrl: ''
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/employees/${userId}`);
                const data = await response.json();
                setFormData({
                    ...data,
                    birth: data.birth ? data.birth.substring(0, 10) : ''
                });
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu nhân viên:', error);
                alert('Không thể tải thông tin nhân viên');
            }
        };

        fetchEmployee();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await fetch(`http://localhost:8080/api/v1/employees/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            alert('Cập nhật thành công');
            navigate('/list-employees');
        } catch (error) {
            console.error('Lỗi cập nhật:', error);
            alert('Cập nhật thất bại');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8 space-y-6">
                <h1
                    className="text-2xl font-medium text-center mb-8"
                    style={{ color: 'rgb(220 38 38 / var(--tw-text-opacity, 1))' }}
                >
                    Edit Employee
                </h1>
                {/* Avatar preview (tùy chọn) */}
                {formData.avatarUrl && (
                    <div className="flex justify-center mb-4">
                        <img
                            src={`http://localhost:8080${formData.avatarUrl}`}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full object-cover border"
                        />
                    </div>
                )}

                {/* User ID & Username */}
                <div className="flex items-center">
                    <label className="w-40 text-gray-700 text-sm">User ID:</label>
                    <div className="flex-1">
                        <input
                            type="text"
                            name="userID"
                            value={formData.userID}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <label className="w-40 text-gray-700 text-sm">Username:</label>
                    <div className="flex-1">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                        />
                    </div>
                </div>

                {/* Các trường còn lại */}
                {[
                    { label: 'First Name', name: 'firstName' },
                    { label: 'Last Name', name: 'lastName' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'Phone', name: 'phone' },
                    { label: 'CCCD', name: 'cccd' },
                    { label: 'Birth (yyyy-mm-dd)', name: 'birth', type: 'date' },
                    { label: 'Password', name: 'password', type: 'password' },
                    { label: 'Role', name: 'role' },
                    { label: 'Status', name: 'status' }
                ].map(({ label, name, type = 'text' }) => (
                    <div key={name} className="flex items-center">
                        <label className="w-40 text-gray-700 text-sm">{label}:</label>
                        <div className="flex-1">
                            <input
                                type={type}
                                name={name}
                                value={formData[name] || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>
                ))}

                {/* Gender */}
                <div className="flex items-center">
                    <label className="w-40 text-gray-700 text-sm">Gender:</label>
                    <div className="flex-1 flex gap-6">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span>Male</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span>Female</span>
                        </label>
                    </div>
                </div>

                {/* Avatar URL */}
                <div className="flex items-center">
                    <label className="w-40 text-gray-700 text-sm">Avatar URL:</label>
                    <div className="flex-1">
                        <input
                            type="text"
                            name="avatarUrl"
                            placeholder="Avatar URL"
                            value={formData.avatarUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/employees')}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditEmployee;
