import React from "react";
import "./TransferForm.scss"; // Ensure this file exists in the same directory

const TransferForm = () => {
  return (
    <div className="transfer-form">
      <h1 className="text-2xl font-bold mb-4">Chuyển khoản</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
            Người nhận
          </label>
          <input
            type="text"
            id="recipient"
            name="recipient"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Nhập tên người nhận"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Số tiền
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Nhập số tiền"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-100 text-red-600 py-2 px-4 rounded-md hover:bg-red-200 transition"
        >
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default TransferForm;