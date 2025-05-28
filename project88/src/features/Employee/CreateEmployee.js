import { useState } from "react";


export default function CreateEmployee({ employee, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    username: '',
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

  // const handleCancel = () => {
  //   setFormData({
  //     username: '',
  //     firstName: '',
  //     lastName: '',
  //     identification: '',
  //     email: '',
  //     phoneNumber: '',
  //     gender: ''
  //   });
  // };

  // const handleSave = () => {
  //   console.log('Employee data:', formData);
  //   // Handle save logic here
  // };

  return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-medium text-orange-500 text-center mb-12">
            Create Employee
          </h1>

          <div className="space-y-6">
            {/* Username */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 text-sm">Username:</label>
              <div className="flex-1">
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                />
                <p className="text-xs text-gray-400 mt-1">Must not duplicate an existing username</p>
              </div>
            </div>

            {/* First Name */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 text-sm">First Name:</label>
              <div className="flex-1">
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                />
                <p className="text-xs text-gray-400 mt-1">Must not be empty</p>
              </div>
            </div>

            {/* Last Name */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 text-sm">Last Name:</label>
              <div className="flex-1">
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                />
                <p className="text-xs text-gray-400 mt-1">Must not be empty</p>
              </div>
            </div>

            {/* Identification */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 text-sm">Identification:</label>
              <div className="flex-1">
                <input
                    type="text"
                    name="identification"
                    value={formData.identification}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                />
                <p className="text-xs text-gray-400 mt-1">Must not be empty</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 text-sm">Email:</label>
              <div className="flex-1">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                />
                <p className="text-xs text-gray-400 mt-1">Valid format, not duplicated</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 text-sm">Phone Number:</label>
              <div className="flex-1">
                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                />
                <p className="text-xs text-gray-400 mt-1">10 digits, starting with 0</p>
              </div>
            </div>

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
                onClick={onSave}
                className="px-8 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
  );
}