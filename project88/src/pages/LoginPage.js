import React from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // sau khi đăng nhập thành công => chuyển hướng đến homepage

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              {...register('username', { required: 'Username is required' })}
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div className="flex items-center mb-4">
            <input
              {...register('remember')}
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-red-100 text-red-600 py-2 px-4 rounded-md hover:bg-red-200 transition"
          >
            Đăng Nhập
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-gray-500 hover:underline">
            Quên Mật Khẩu?
          </a>{' '}
          <a href="#" className="text-sm text-red-600 font-medium hover:underline">
            Tạo Tài Khoản
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
