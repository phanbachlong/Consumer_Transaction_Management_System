import React, { useState } from "react";
import TransferForm from "./Tranfer";

const HomeContent = () => {
  const [showTransfer, setShowTransfer] = useState(false);

  return (
    <main className="flex-1 p-8 flex flex-col lg:flex-row gap-8 bg-gray-100">
      {/* Left Section */}
      <div className="flex-1 space-y-8">
        {/* User Info */}
        <div className="bg-white p-6 rounded shadow">
          <div className="flex items-center space-x-4 ">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-red-600">
              AVA
            </div>
            <div>
              <h2 className="text-xl font-bold">Nguyễn Văn A</h2>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex w-full mt-5 justify-between space-x-4">
              <div className="flex-1 text-center bg-white p-6 rounded shadow">
                <div className="text-gray-500 ">Số dư</div>
                <div className="text-2xl font-bold">1.000.000.000 VND</div>
                <button
                  className="mt-2 w-full h-12 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  onClick={() => setShowTransfer(true)}
                >
                  Chuyển khoản
                </button>
              </div>
              <div className="flex-1 text-center bg-white p-6 rounded shadow">
                <div className="text-gray-500 ">Tiết kiệm</div>
                <div className="text-2xl font-bold">1.000.000.000 VND</div>
                <div className="flex justify-between space-x-4 mt-2">
                  <button className="w-1/2 h-12 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 overflow-hidden whitespace-nowrap text-ellipsis">
                    Gửi
                  </button>
                  <button className=" w-1/2 h-12 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 overflow-hidden whitespace-nowrap text-ellipsis">
                    Rút
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Lịch sử giao dịch</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Ngày</th>
                <th className="border border-gray-300 px-4 py-2">Loại</th>
                <th className="border border-gray-300 px-4 py-2">Nội dung</th>
                <th className="border border-gray-300 px-4 py-2">Phí</th>
                <th className="border border-gray-300 px-4 py-2">Số dư</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, i) => (
                <tr key={i} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">04/05/2025</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {i % 2 === 0 ? "CK" : "HD"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {i % 2 === 0
                      ? "Chuyển khoản đến 123456789"
                      : "Thanh toán HD 987654321"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">-1.000.000 VND</td>
                  <td className="border border-gray-300 px-4 py-2">900.000.000 VND</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Page */}
          <div className="text-right mt-4">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              First
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              1
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              2
            </button>
            <span className="px-4 py-2">...</span>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              5
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              Last
            </button>
          </div>
        </div>
      </div>

      {/* Thanh toán hóa đơn */}
      <div className="w-full lg:w-1/5 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div className="p-4 bg-white shadow rounded" key={i}>
            <div className="text-lg font-bold">Hóa đơn điện</div>
            <div className="text-gray-500 mt-2">
              Mã HD: 987654321
              <br />
              Số tiền cần thanh toán: 1.000.000 VND
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200">
              Thanh Toán
            </button>
          </div>
        ))}
      </div>

      {/* Modal for TransferForm */}
      {showTransfer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setShowTransfer(false)}
              aria-label="Close"
            >
              ×
            </button>
            <TransferForm setShowTransfer={setShowTransfer}/>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomeContent;