import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../../api/AuthAPI';

const FogotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const FogotPassword = async (email) => {
    try {
      // Gọi API để gửi email reset mật khẩu
      const response = await AuthAPI.forgotPassword(email);
      // Hiển thị thông báo thành công
      alert(response.data)
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Đã xảy ra lỗi khi gửi email. Vui lòng thử lại sau.');
    }
  }

  const onSubmit = async (data) => {

    await FogotPassword(data.email);
    navigate('/login')
    // sau khi gửi email thành công => popup thông báo => chuyển hướng đến trang login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Quên Mật Khẩu</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-red-100 text-red-600 py-2 px-4 rounded-md hover:bg-red-200 transition"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default FogotPassword;
