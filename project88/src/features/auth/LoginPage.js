import React from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import { ValidationLogin } from '../../validation/ValidationLogin';
import AuthAPI from '../../api/AuthAPI';

const LoginPage = () => {
  localStorage.clear();
  const navigate = useNavigate();

  const initialValues = { username: '', password: '', remember: false };

  const onSubmit = async (data) => {
    try {
      const response = await AuthAPI.login({
        username: data.username,
        password: data.password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      alert('Đăng nhập thành công!');
      navigate('/homepage');
    } catch (error) {
      // Lấy thông báo lỗi từ backend
      const message = error.response?.data || 'Đăng nhập thất bại!';
      alert(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h1>
        <Form onSubmit={onSubmit} initialValues={initialValues} btn="Đăng Nhập" validation={ValidationLogin} />
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/fogot-password')}
            className="text-sm text-gray-500 hover:underline"
          >
            Quên Mật Khẩu?
          </button>
          <button
            onClick={() => navigate('/register')}
            className="text-sm text-red-600 font-medium hover:underline"
          >
            Tạo Tài Khoản
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
