import React from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';

const LoginPage = () => {
  const navigate = useNavigate();

  const initialValues = { username: '', password: '', remember: false };

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Đăng nhập thành công!');
    // sau khi đăng nhập thành công => chuyển hướng đến homepage

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h1>
        <Form onSubmit={onSubmit} initialValues={initialValues} btn="Đăng Nhập" />
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
