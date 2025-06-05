import React, { useState } from "react";
import userApi from "../../api/UserApi";

export default function TopUp({ user, onClose }) {

  const [amount, setAmount] = useState("");

  const handleTopUp = async (e) => {
    e.preventDefault();
    if (!amount || !user) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    try {
      const res = await userApi.topUp({
        userID: user.userID,
        money: Number(amount),
      });
      alert("✅ " + res.data); // "Nạp tiền thành công"
      onClose(); // đóng modal
    } catch (err) {
      alert("❌ Lỗi khi nạp tiền: " + err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white relative">
      {/* User info */}
      <div className="flex items-center bg-gray-100 rounded-lg mb-6 p-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center font-bold text-orange-500 text-xl mr-4">
          A
        </div>
        <div>
          <div className="font-bold text-base">{user?.fullName}</div>
          <div className="text-gray-600 text-sm">STK: {user?.cardNumber}</div>
        </div>
      </div>

        <div className="mb-6">
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-400 text-base"
            placeholder="Nhập số tiền cần nạp"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="w-1/2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={() => onClose(false)}
          >
            Hủy
          </button>
          <button
            type="button"
            className="w-1/2 bg-red-500 hover:bg-red-400 text-white font-bold text-lg rounded py-2 transition"
            onClick={handleTopUp}
          >
            Nạp tiền
          </button>
        </div>
    </div>
  );
}
