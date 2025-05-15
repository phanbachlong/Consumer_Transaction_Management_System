import React from "react";
import { useForm } from "react-hook-form";
import Form from "../../components/Form";
import { ValidationChangePassword } from "../../validation/ValidationChangePassword";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {

    const navigate = useNavigate();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (data) => {
    console.log("Password Change Data:", data);
    alert("Đổi mật khẩu thành công!");
    navigate('/login')

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
