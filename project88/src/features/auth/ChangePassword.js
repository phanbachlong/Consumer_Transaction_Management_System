import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Form from "../../components/Form";
import { ValidationChangePassword } from "../../validation/ValidationChangePassword";
import AuthAPI from "../../api/AuthAPI";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const resetPassword = async (data) => {
    try {
      const response = await AuthAPI.resetPassword({
        token: token,
        newPassword: data.confirmPassword,
      });
      if (response.status === 200) {
        alert("Đổi mật khẩu thành công!");
        navigate('/login');
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Đổi mật khẩu thất bại. Vui lòng thử lại: " + (error.response?.data || error.message));
    }
  };

  const onSubmit = (data) => {
    resetPassword(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Đổi mật khẩu</h1>
        <Form onSubmit={onSubmit} initialValues={initialValues} btn='Xác nhận' validation={ValidationChangePassword}/>
      </div>
    </div>
  );
};

export default ChangePassword;
