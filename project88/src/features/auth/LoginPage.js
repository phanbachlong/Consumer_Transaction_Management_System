import React from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import { ValidationLogin } from '../../validation/ValidationLogin';
import AuthAPI from '../../api/AuthAPI';

const LoginPage = () => {
  const navigate = useNavigate();

  const initialValues = { username: '', password: '', remember: false };

  const onSubmit = async (data) => {
    try {
      const response = await AuthAPI.login({
        username: data.username,
        password: data.password,
      });
      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', response.data.role);
      alert('Đăng nhập thành công!');
      navigate('/homepage'); // chuyển hướng về homepage
    } catch (error) {
      alert('Đăng nhập thất bại!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h1>
        <Form onSubmit={onSubmit} initialValues={initialValues} btn="Đăng Nhập" validation={ValidationLogin} />
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/fogotPassword')}
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
