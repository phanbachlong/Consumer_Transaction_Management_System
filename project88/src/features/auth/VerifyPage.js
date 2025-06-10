import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AuthAPI from "../../api/AuthAPI";

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang xác thực tài khoản...");
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      AuthAPI.verify(token)
        .then((res) => {
          setMessage("Kích hoạt tài khoản thành công! Bạn có thể đăng nhập.");
          setTimeout(() => navigate("/login"), 3000);
        })
        .catch((err) => {
          setMessage(
            err.response?.data || "Xác thực thất bại hoặc token đã hết hạn!"
          );
        });
    } else {
      setMessage("Không tìm thấy token xác thực!");
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Xác thực tài khoản</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default VerifyPage;