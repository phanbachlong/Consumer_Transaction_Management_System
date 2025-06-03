import { useState } from "react";
import axios from "axios";

export default function CreateEmployee({ onCancel }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    identification: '',
    email: '',
    phoneNumber: '',
    gender: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      cccd: formData.identification,
      phone: formData.phoneNumber,
      gender: formData.gender,
      password: formData.password,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/employees', payload);
      console.log('User created:', response.data);
      alert('Tạo người dùng thành công!');
    } catch (error) {
      console.error('Lỗi khi tạo người dùng:', error);
      alert('Tạo người dùng thất bại!');
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-medium text-orange-500 text-center mb-12">
            Create Employee
          </h1>

          <div className="space-y-6">
            {/* Username */}
            <InputField label="Username" name="username" value={formData.username} onChange={handleInputChange} />

            {/* Password */}
            <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} />

            {/* First Name */}
            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />

            {/* Last Name */}
            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />

            {/* Identification */}
            <InputField label="Identification" name="identification" value={formData.identification} onChange={handleInputChange} />

            {/* Email */}
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />

            {/* Phone Number */}
            <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />

            {/* Gender */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 text-sm">Gender:</label>
              <div className="flex-1">
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Female</span>
                  </label>
                </div>
                <p className="text-xs text-gray-400 mt-1">Gender</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-12">
            <button
                onClick={onCancel}
                className="px-8 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
            >
              Hủy
            </button>
            <button
                onClick={handleSave}
                className="px-8 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
  );
}

// Component Input đơn giản
function InputField({ label, name, value, onChange, type = "text" }) {
  return (
      <div className="flex items-center">
        <label className="w-32 text-gray-700 text-sm">{label}:</label>
        <div className="flex-1">
          <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>
  );
}
