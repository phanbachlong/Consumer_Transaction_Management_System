import React from 'react';

const SuccessModal = ({ isOpen, onClose, transactionId, type = "deposit" }) => {
  if (!isOpen) return null;
  
  const isDeposit = type === "deposit";
  const title = isDeposit ? "Nạp tiền thành công!" : "Thanh toán thành công!";
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-center">{title}</h2>
        </div>
        
        <div className="bg-gray-50 p-4 rounded mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Mã giao dịch:</span>
            <span className="font-medium">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Thời gian:</span>
            <span className="font-medium">{new Date().toLocaleString('vi-VN')}</span>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;


