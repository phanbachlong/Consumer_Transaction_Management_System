import React from 'react';

const SuccessModal = ({ isOpen, onClose, transactionId }) => {
  if (!isOpen) return null;
  
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()} - ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-center">Thanh toán thành công</h2>
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Mã giao dịch:</span>
            <span className="font-medium">{transactionId || 'TXN04512025'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Thời gian:</span>
            <span className="font-medium">{formattedDate}</span>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
