import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditEmployee.scss';

const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        birth: '',
        avatarUrl: '',
        cccd: '',
        phone: '',
        gender: '',
        role: '',
    });

    const [apiData, setApiData] = useState({}); // dữ liệu gốc từ API
    const userId = 1;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`);
                setApiData(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const getValueOrPlaceholder = (field) => {
        return employee[field] || '';
    };

    return (
        <div className="edit-employee-wrapper">
            <div className="edit-employee-box">
                <h2>Edit Employee</h2>
                <form>
                    <label>Username:</label>
                    <input
                        name="username"
                        value={employee.username}
                        onChange={handleChange}
                        placeholder={apiData.username}
                    />

                    <label>First Name:</label>
                    <input
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                        placeholder={apiData.firstName}
                    />

                    <label>Last Name:</label>
                    <input
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                        placeholder={apiData.lastName}
                    />

                    <label>Email:</label>
                    <input
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        placeholder={apiData.email}
                    />

                    <label>Birth Date:</label>
                    <input
                        type="date"
                        name="birth"
                        value={employee.birth}
                        onChange={handleChange}
                        placeholder={apiData.birth}
                    />

                    <label>Avatar URL:</label>
                    <input
                        name="avatarUrl"
                        value={employee.avatarUrl}
                        onChange={handleChange}
                        placeholder={apiData.avatarUrl}
                    />

                    <label>CCCD:</label>
                    <input
                        name="cccd"
                        value={employee.cccd}
                        onChange={handleChange}
                        placeholder={apiData.cccd}
                    />

                    <label>Phone Number:</label>
                    <input
                        name="phone"
                        value={employee.phone}
                        onChange={handleChange}
                        placeholder={apiData.phone}
                    />

                    <label>Gender:</label>
                    <div className="gender">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={employee.gender === 'male'}
                                onChange={handleChange}
                            /> Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={employee.gender === 'female'}
                                onChange={handleChange}
                            /> Female
                        </label>
                    </div>

                    <label>Role:</label>
                    <input
                        name="role"
                        value={employee.role}
                        onChange={handleChange}
                        placeholder={apiData.role}
                    />

                    <div className="buttons">
                        <button type="button" className="cancel">Hủy</button>
                        <button type="submit" className="save">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
